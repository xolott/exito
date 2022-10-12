export interface PaginatedItems<T> {
    items: T[];
    get hasNextPage(): boolean;
    get hasPrevPage(): boolean;
    next(): Promise<boolean>;
    prev(): Promise<boolean>;
}
