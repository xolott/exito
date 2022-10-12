import { GHSearchRepositoriesHandler } from "@/infrastructure/github/queries/search/search_repositories";
import { GitSearchType } from "@/features/interfaces/git-server";

export const GHSearchQueryHandler = {
    [GitSearchType.REPOSITORY]: GHSearchRepositoriesHandler,
};
