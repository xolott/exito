import { generatePaginationVariables } from "./graphql-page-info";

describe("GraphQL Page Info", () => {
    describe("generatePaginationVariables", () => {
        const cursor = "testCursor123";
        it("should return and empty object whe empty options are used", () => {
            const result = generatePaginationVariables({}, {});
            expect(result).toBeDefined();
            expect(Object.keys(result)).toHaveLength(0);
        });

        it("should return only first property first when empty options are used", () => {
            const result = generatePaginationVariables({ limit: 10 }, {});
            expect(Object.keys(result)).toHaveLength(1);
            expect(result.first).toBe(10);
        });

        it("should return the correct properties for a forward navigation", () => {
            const result = generatePaginationVariables({ limit: 10 }, { endCursor: cursor });
            expect(Object.keys(result)).toHaveLength(2);
            expect(result.first).toBe(10);
            expect(result.after).toBe(cursor);
        });

        it("should return the correct properties for a backward navigation", () => {
            const result = generatePaginationVariables({ limit: 10 }, { startCursor: cursor });
            expect(Object.keys(result)).toHaveLength(2);
            expect(result.last).toBe(10);
            expect(result.before).toBe(cursor);
        });

        it("should return the correct properties for a backward navigation when all options are provided", () => {
            const result = generatePaginationVariables({ limit: 10 }, { startCursor: cursor, endCursor: cursor });
            expect(Object.keys(result)).toHaveLength(2);
            expect(result.last).toBe(10);
            expect(result.before).toBe(cursor);
        });
    });
});
