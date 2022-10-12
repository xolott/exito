import _ from "lodash";
import { QueryFunction } from "@/infrastructure/github/types";
import { GitRepository } from "@/models/git-repository";
import {
    GraphqlPaginatedItems,
    GraphqlPaginatedItemsFetcher,
    GraphqlPaginatedItemsFetcherParams,
} from "@/infrastructure/graphql/graphql-paginated-items";
import { generatePaginationVariables, GraphqlPageInfo } from "@/infrastructure/graphql/graphql-page-info";

interface GHSearchRepositoriesResponseNode {
    id: string;
    name: string;
    owner: {
        id: string;
        login: string;
    };
}

interface GHSearchRepositoriesResponse {
    search: {
        pageInfo: GraphqlPageInfo;
        nodes: GHSearchRepositoriesResponseNode[];
    };
}

const GHSearchRepositoriesQuery = `
query search($query: String!, $first: Int, $last: Int, $after: String, $before: String) {
  search(
    query: $query
    type: REPOSITORY
    first: $first
    last: $last
    after: $after
    before: $before
    
  ){
    pageInfo{
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    nodes {
      ... on Repository {
        id
        name
        nameWithOwner
        openGraphImageUrl
        owner {
          id
          login
        }
      }
    }
  }
}`;

export async function GHSearchRepositoriesHandler(
    query: QueryFunction,
    text: string,
    pagination?: SearchPaginationParams,
): Promise<GraphqlPaginatedItems<GitRepository>> {
    const paginationWithDefaults = _.defaults(pagination ?? {}, { limit: 10 });
    const fetcher: GraphqlPaginatedItemsFetcher<GitRepository> = async (
        params?: GraphqlPaginatedItemsFetcherParams,
    ) => {
        const { search } = await query<GHSearchRepositoriesResponse>(GHSearchRepositoriesQuery, {
            query: text,
            ...generatePaginationVariables(paginationWithDefaults, params),
        });
        return new GraphqlPaginatedItems<GitRepository>({
            fetcher,
            pageInfo: search.pageInfo,
            items: search.nodes.map(
                (node) => ({ id: node.id, name: node.name, owner: node.owner.login } as GitRepository),
            ),
        });
    };
    return await fetcher();
}
