import { GraphqlPaginatedItems, GraphqlPaginatedItemsFetcher } from "./graphql-paginated-items";

describe("Graphql Paginated Items", () => {
    it("should return empty array when undefined data is used", () => {
        const fetcher = vi.fn() as GraphqlPaginatedItemsFetcher<string>;
        const searchResult = new GraphqlPaginatedItems<string>({
            fetcher,
            items: undefined as unknown as string[],
            pageInfo: {
                startCursor: "",
                endCursor: "",
                hasNextPage: false,
                hasPreviousPage: false,
            },
        });
        expect(searchResult.items).toBeInstanceOf(Array);
        expect(searchResult.items).toHaveLength(0);
    });

    it("should return false when there are no next or previous page", async () => {
        const fetcher = vi.fn() as GraphqlPaginatedItemsFetcher<string>;
        const searchResult = new GraphqlPaginatedItems<string>({
            fetcher,
            items: undefined as unknown as string[],
            pageInfo: {
                startCursor: "",
                endCursor: "",
                hasNextPage: false,
                hasPreviousPage: false,
            },
        });
        expect(searchResult.hasNextPage).toBe(false);
        expect(searchResult.hasPrevPage).toBe(false);
        expect(await searchResult.next()).toBe(false);
        expect(await searchResult.prev()).toBe(false);
    });

    it("should return true when there are next or previous page", async () => {
        const fetcher = vi.fn(() => ({
            items: [],
            pageInfo: {
                startCursor: "",
                endCursor: "",
                hasNextPage: true,
                hasPreviousPage: true,
            },
        })) as unknown as GraphqlPaginatedItemsFetcher<string>;
        const searchResult = new GraphqlPaginatedItems<string>({
            fetcher,
            items: undefined as unknown as string[],
            pageInfo: {
                startCursor: "",
                endCursor: "",
                hasNextPage: true,
                hasPreviousPage: true,
            },
        });
        expect(searchResult.hasNextPage).toBe(true);
        expect(searchResult.hasPrevPage).toBe(true);
        expect(await searchResult.next()).toBe(true);
        expect(await searchResult.prev()).toBe(true);
    });
});
