import "reflect-metadata";
import { Container, injectable } from "inversify";
import { useInjectable, useSettings } from "./index";
import { Settings } from "@/models/settings";
import { iocContainer } from "../../../core/ioc-container";
import _ from "lodash";

describe("Composable - useInjectable", () => {
    @injectable()
    class Injected {
        foo = "bar";
    }

    class NonInjected {}

    const TYPES = {
        Injected: Symbol.for("Injected"),
        NonInjected: Symbol.for("NonInjected"),
        Settings: Symbol.for("Settings"),
    };

    vitest.spyOn(console, "warn").mockImplementation(_.stubTrue);

    it("should thrown error if the symbols doesn't exists in the container", () => {
        const container = new Container();

        expect(() => useInjectable<Injected>(TYPES.Injected, container)).toThrow();
        expect(() => useInjectable<NonInjected>(TYPES.NonInjected, container)).toThrow();
    });

    it("should return an instance if the symbols exists in the container", () => {
        const container = new Container();
        container.bind<Injected>(TYPES.Injected).to(Injected);

        const instance = useInjectable<Injected>(TYPES.Injected, container);

        expect(instance).toBeInstanceOf(Object);
        expect(instance).toBeInstanceOf(Injected);
        expect(instance.foo).toBe("bar");
    });

    it("should uses default container", () => {
        iocContainer.bind<Injected>(TYPES.Injected).to(Injected);

        const instance = useInjectable<Injected>(TYPES.Injected);

        expect(instance).toBeInstanceOf(Object);
        expect(instance).toBeInstanceOf(Injected);
        expect(instance.foo).toBe("bar");
        iocContainer.unbind(TYPES.Injected);
    });

    it("should return the settings with useSettings", () => {
        const container = new Container();
        container.bind<Settings>(TYPES.Settings).to(Injected as unknown as new (...args: never[]) => Settings);

        const instance = useSettings(container);

        expect(instance).toBeInstanceOf(Object);
        expect(instance).toBeInstanceOf(Injected);
        expect((instance as unknown as Injected).foo).toBe("bar");
    });
});
