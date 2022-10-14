export const ElectronStore = vi.fn(() => {
    const storageState = new Map<string, string | number | object | boolean | null | undefined>();
    return {
        storageState,
        get: vi.fn((key) => storageState.get(key)),
        delete: vi.fn((key) => storageState.delete(key)),
        set: vi.fn((key, value) => storageState.set(key, value)),
        onDidChange: vi.fn(),
        clear() {
            this.storageState.clear();
        },
    };
});
