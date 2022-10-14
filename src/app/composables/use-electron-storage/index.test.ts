/**
 * @vitest-environment happy-dom
 */

import { useSetup } from "../../tests/mount";
import { useElectronStorage } from "./index";
import { nextTwoTick } from "@/app/tests/next-tick";
import { ElectronStore } from "./electron-store";

const KEY = "TEST_KEY";

vi.mock("./electron-store.ts");

describe("useElectronStorage", () => {
    const storageState = new Map<string, string | number | object | boolean | null | undefined>();
    const storageMock = {
        get: vi.fn((key) => storageState.get(key)),
        delete: vi.fn((key) => storageState.delete(key)),
        set: vi.fn((key, value) => storageState.set(key, value)),
        onDidChange: vi.fn(),
    };
    const storage = storageMock as unknown as ElectronStore;
    beforeEach(() => {
        storageState.clear();
        storageMock.get.mockClear();
        storageMock.set.mockClear();
        storageMock.delete.mockClear();
        storageMock.onDidChange.mockClear();
    });

    it("uses electron-store by default", () => {
        useSetup(() => {
            const ref = useElectronStorage(KEY, null);
            return { ref };
        });
        expect(ElectronStore).toHaveBeenCalledTimes(1);
    });

    it("should throw error on get", () => {
        const getError = new Error("get-error");
        const storageMock = {
            get: vi.fn(() => {
                throw getError;
            }),
            delete: vi.fn(),
            set: vi.fn(),
            onDidChange: vi.fn(),
        };
        const storage = storageMock as unknown as ElectronStore;

        storageState.set(KEY, 0);
        const promiseThatThrows = async () => {
            const storedRef = useElectronStorage<number>(KEY, null as unknown as number, { storage });
            storedRef.value = null;

            await nextTwoTick();
        };
        expect(promiseThatThrows()).rejects.toBe(getError);
    });

    it("should throw error on set", () => {
        const setError = new Error("set-error");
        const storageMock = {
            set: vi.fn(() => {
                throw setError;
            }),
            get: vi.fn((key) => storageState.get(key)),
            delete: vi.fn(),
            onDidChange: vi.fn(),
        };
        const storage = storageMock as unknown as ElectronStore;

        const promiseThatThrows = async () => {
            const storedRef = useElectronStorage<number>(KEY, 0, { storage });
            storedRef.value = null;

            await nextTwoTick();
        };
        expect(promiseThatThrows()).rejects.toBe(setError);
    });

    const testCases = [
        {
            defaultValue: "default test value",
            initialValue: "initial test value",
            nextValues: ["new test value", "null"],
        },
        {
            defaultValue: 0,
            initialValue: 3,
            nextValues: [1, -1, 10.45, -43.1, Math.random(), Math.random() * 100, Math.floor(Math.random() * 23)],
        },
        {
            defaultValue: false,
            initialValue: true,
            nextValues: [true, false, true, false, false],
        },
    ];
    testCases.forEach((testCase) => {
        it(`accepts '${typeof testCase.initialValue}' values in vue component`, async () => {
            const vm = useSetup(() => {
                const ref = useElectronStorage<typeof testCase.initialValue>(KEY, testCase.initialValue, { storage });
                return { ref };
            });
            expect(vm.ref).toBe(testCase.initialValue);
            expect(storage.get).toBeCalledWith(KEY);
            expect(storage.set).toBeCalledWith(KEY, testCase.initialValue);
            for (const nextValue of testCase.nextValues) {
                vm.ref = nextValue;
                await nextTwoTick();
                expect(vm.ref).toBe(nextValue);
                expect(storage.set).toBeCalledWith(KEY, nextValue);
            }
        });

        it(`accepts '${typeof testCase.initialValue}' values`, async () => {
            storageState.set(KEY, testCase.defaultValue);
            const storedRef = useElectronStorage<typeof testCase.initialValue>(KEY, testCase.initialValue, { storage });
            expect(storedRef.value).toBe(testCase.defaultValue);
            expect(storage.get).toBeCalledWith(KEY);
            expect(storage.set).toHaveBeenCalledTimes(0);

            for (const nextValue of [testCase.initialValue, ...testCase.nextValues]) {
                storedRef.value = nextValue;
                await nextTwoTick();
                expect(storedRef.value).toBe(nextValue);
                expect(storage.set).toBeCalledWith(KEY, nextValue);
            }
        });

        it(`removes '${typeof testCase.initialValue}' values`, async () => {
            storageState.set(KEY, testCase.defaultValue);
            const storedRef = useElectronStorage<typeof testCase.initialValue>(
                KEY,
                null as unknown as typeof testCase.initialValue,
                { storage },
            );
            storedRef.value = null;

            await nextTwoTick();

            expect(storedRef.value).toBeNull();
            expect(storage.delete).toHaveBeenCalledTimes(1);
            expect(storage.get(KEY)).toBeFalsy();
        });
    });

    it("mergeDefaults", async () => {
        const options = { storage, mergeDefaults: true };
        storageState.set(KEY, 0);
        const numberRef = useElectronStorage(KEY, 1, options);
        expect(numberRef.value).toBe(0);

        storageState.set(KEY, { foo: "bar" });
        const objectRef = useElectronStorage<object>(KEY, { foo: "not-bar", fulanito: "menganito" }, options);
        expect(objectRef.value).toEqual({ foo: "bar", fulanito: "menganito" });

        storageState.set(KEY, [1, 2]);
        const arrayRef = useElectronStorage<Array<number>>(KEY, [3, 4], options);
        expect(arrayRef.value).toEqual([1, 2]);
    });

    it("subscribes to storage updates", async () => {
        type callbackType = (value: number) => void;
        let callback: callbackType | null = null;
        const storageMock = {
            get: vi.fn((key) => storageState.get(key)),
            delete: vi.fn((key) => storageState.delete(key)),
            set: vi.fn((key, value) => storageState.set(key, value)),
            onDidChange: vi.fn((key, cb) => {
                callback = cb;
            }),
        };
        const storage = storageMock as unknown as ElectronStore;
        const options = { storage };
        storageState.set(KEY, 0);
        const numberRef = useElectronStorage(KEY, 1, options);
        expect(storage.get).toHaveBeenCalledTimes(1);

        expect(numberRef.value).toBe(0);
        expect(storage.onDidChange).toHaveBeenCalledTimes(1);
        expect(callback).not.toBeNull();

        (callback as unknown as callbackType)(9);

        // Value is updated directly and no read is required
        expect(storage.get).toHaveBeenCalledTimes(1);
    });

    it("doesn't subscribe to storage updates", async () => {
        const options = { storage, listenToStorageChanges: false };
        storageState.set(KEY, 0);
        const numberRef = useElectronStorage(KEY, 1, options);
        expect(numberRef.value).toBe(0);
        expect(storage.onDidChange).toHaveBeenCalledTimes(0);
    });
});
