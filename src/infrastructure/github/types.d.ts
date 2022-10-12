import { GraphQlResponse, RequestParameters } from "@octokit/graphql/dist-types/types";

export type QueryFunction = <T>(query: string, parameters?: RequestParameters) => Promise<GraphQlResponse<T>>;
