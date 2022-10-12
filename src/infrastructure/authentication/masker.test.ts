import { Masker } from "@/infrastructure/authentication/masker";

describe("Masker", () => {
    it("should return the input when it's null, empty or undefined", () => {
        const masker = new Masker();
        const testCases = [undefined, null, ""] as unknown as string[];
        testCases.forEach((input) => expect(masker.mask(input)).toBe(input));
    });

    it("should mask the whole input when both offsets are zero", () => {
        const masker = new Masker({
            unmaskStart: 0,
            unmaskEnd: 0,
        });
        const testCases = {
            "123": "***",
            abc123def456: "************",
            ".-.-.-.-.-.-.-.": "***************",
        };

        Object.entries(testCases).forEach(([input, output]) => expect(masker.mask(input)).toBe(output));
    });

    it("should allow options overriding", () => {
        const masker = new Masker({
            maskCharacter: "*",
        });
        const input = "1234567890";
        const outputA = "**********";
        const outputB = "xxxxxxxxxx";
        expect(masker.mask(input)).toBe(outputA);
        expect(masker.mask(input, { maskCharacter: "x" })).toBe(outputB);
    });
});
