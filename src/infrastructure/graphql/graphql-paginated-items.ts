import { PaginatedItems } from "@/features/interfaces/paginated-items";
import { GraphqlPageInfo } from "@/infrastructure/graphql/graphql-page-info";

export type GraphqlPaginatedItemsFetcherParams = Partial<Pick<GraphqlPageInfo, "startCursor" | "endCursor">>;
export type GraphqlPaginatedItemsFetcher<T> = (
    params?: GraphqlPaginatedItemsFetcherParams,
) => Promise<GraphqlPaginatedItems<T>>;

export interface GraphqlPaginatedItemsProps<T> {
    fetcher: GraphqlPaginatedItemsFetcher<T>;
    items: T[];
    pageInfo: GraphqlPageInfo;
}

export class GraphqlPaginatedItems<T> implements PaginatedItems<T> {
    items: T[];
    private readonly fetcher: GraphqlPaginatedItemsFetcher<T>;
    private pageInfo: GraphqlPageInfo;

    constructor(props: GraphqlPaginatedItemsProps<T>) {
        this.fetcher = props.fetcher;
        this.items = props.items || [];
        this.pageInfo = props.pageInfo;
    }

    async next(): Promise<boolean> {
        if (!this.pageInfo.hasNextPage) return false;
        await this.update({ endCursor: this.pageInfo.endCursor });
        return true;
    }

    async prev(): Promise<boolean> {
        if (!this.pageInfo.hasPreviousPage) return false;
        await this.update({ startCursor: this.pageInfo.startCursor });
        return true;
    }

    get hasNextPage(): boolean {
        return this.pageInfo.hasNextPage;
    }

    get hasPrevPage(): boolean {
        return this.pageInfo.hasPreviousPage;
    }

    private async update(params: GraphqlPaginatedItemsFetcherParams) {
        const page = await this.fetcher(params);
        this.pageInfo = page.pageInfo;
        this.items = page.items;
    }
}
