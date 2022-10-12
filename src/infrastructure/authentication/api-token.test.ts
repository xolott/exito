import { ApiTokenAuthentication } from "@/infrastructure/authentication/api-token";
import { InvalidTokenError } from "@/features/errors";

describe("API Token Authentication", () => {
    it("throws error when token is undefined or empty", () => {
        const testCases = [null, undefined, ""] as unknown as string[];
        testCases.forEach((token: string) =>
            expect(() => new ApiTokenAuthentication(token)).toThrow(InvalidTokenError),
        );
    });

    it("safe string should return a masked token", () => {
        const testCases = {
            "1234567890": "123*****90",
            "ldf*JTF08T76Y^7XxiDVLx2m": "ldf*******************2m",
            "keFXI3tXoh0swk4K%F016hz1": "keF*******************z1",
            "OM8NfPD82E9r^VT#i@yImJ6E": "OM8*******************6E",
            "N5Qyq!RTAH#55YJ$S%mlL^N7": "N5Q*******************N7",
            "14$7Hz": "******",
            "1Ig2N%rx7": "*********",
        };
        Object.entries(testCases).forEach(([key, value]) => {
            const auth = new ApiTokenAuthentication(key);
            expect(auth.safeString).toBe(value);
        });
    });

    it("should return the HTTP header", () => {
        const testCases = [
            "1234567890",
            "ldf*JTF08T76Y^7XxiDVLx2m",
            "keFXI3tXoh0swk4K%F016hz1",
            "OM8NfPD82E9r^VT#i@yImJ6E",
            "N5Qyq!RTAH#55YJ$S%mlL^N7",
            "14$7Hz",
            "1Ig2N%rx7",
        ];
        testCases.forEach((token) => {
            const auth = new ApiTokenAuthentication(token);
            expect(auth.httpHeader).toBe(`Bearer ${token}`);
        });
    });

    it("should return the HTTP header with custom prefix", () => {
        const testCases = [
            "1234567890",
            "ldf*JTF08T76Y^7XxiDVLx2m",
            "keFXI3tXoh0swk4K%F016hz1",
            "OM8NfPD82E9r^VT#i@yImJ6E",
            "N5Qyq!RTAH#55YJ$S%mlL^N7",
            "14$7Hz",
            "1Ig2N%rx7",
        ];
        testCases.forEach((token) => {
            const auth = new ApiTokenAuthentication(token, { httpPrefix: "token" });
            expect(auth.httpHeader).toBe(`token ${token}`);
        });
    });
});
