import { GitSearchType, GitSearchTypeResponse, GitServer } from "@/features/interfaces/git-server";
import { Authentication } from "@/features/interfaces/authentication";
import { GitUser } from "@/models/GitUser";
import { ApiTokenAuthentication } from "@/infrastructure/authentication/api-token";
import { graphql } from "@octokit/graphql";
import { GraphQlResponse, graphql as graphqlType, RequestParameters } from "@octokit/graphql/dist-types/types";
import { RequestError } from "@octokit/request-error";
import { InvalidTokenError } from "@/features/errors";
import { GHQuery, GHQueryResponses, GHQueryType } from "@/infrastructure/github/queries";
import { PaginatedItems } from "@/features/interfaces/paginated-items";
import { GHSearchQueryHandler } from "@/infrastructure/github/queries/search";

export class Github implements GitServer {
    auth: Authentication;
    private readonly graphqlWithAuth: graphqlType;

    constructor(token: string) {
        this.auth = new ApiTokenAuthentication(token, { httpPrefix: "token" });
        this.graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: this.auth.httpHeader,
            },
        });
    }

    async getUserInfo(): Promise<GitUser> {
        const { user } = await this.query<GHQueryResponses[GHQueryType.GET_USER_INFO]>(
            GHQuery[GHQueryType.GET_USER_INFO],
        );
        return {
            avatarUrl: user.avatarUrl,
            id: user.id,
            username: user.login,
            name: user.name,
        };
    }

    async search<T extends GitSearchType>(
        searchKeywords: string,
        type: T,
    ): Promise<PaginatedItems<GitSearchTypeResponse[T]>> {
        return GHSearchQueryHandler[type](
            <T>(query: string, parameters?: RequestParameters) => this.query<T>(query, parameters),
            searchKeywords,
        );
    }

    async query<T>(query: string, parameters?: RequestParameters): Promise<GraphQlResponse<T>> {
        try {
            return await this.graphqlWithAuth<T>(query, parameters);
        } catch (e) {
            if (!(e instanceof RequestError)) throw e;
            if (e.status === 401) throw new InvalidTokenError(this.auth.safeString);
            throw e;
        }
    }
}
