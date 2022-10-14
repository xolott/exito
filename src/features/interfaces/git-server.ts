import { GitUser } from "@/models/git-user";
import { Authentication } from "@/features/interfaces/authentication";
import { GitRepository } from "@/models/git-repository";
import { PaginatedItems } from "@/features/interfaces/paginated-items";

export enum GitSearchType {
    REPOSITORY,
}

export interface GitSearchTypeResponse {
    [GitSearchType.REPOSITORY]: GitRepository;
}

export interface GitServer {
    auth: Authentication;
    getUserInfo(): Promise<GitUser>;
    search<T extends GitSearchType>(searchKeywords: string, type: T): Promise<PaginatedItems<GitSearchTypeResponse[T]>>;
}
