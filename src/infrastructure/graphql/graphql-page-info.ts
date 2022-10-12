import _ from "lodash";

export interface GraphqlPageInfo {
    endCursor: string;
    startCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface GraphqlPaginationParams {
    limit?: number;
}

interface GraphqlPaginationVariables {
    first?: number;
    last?: number;
    before?: string;
    after?: string;
}

export function generatePaginationVariables(
    options: GraphqlPaginationParams,
    cursors?: Partial<GraphqlPageInfo>,
): GraphqlPaginationVariables {
    const limitName = cursors?.startCursor ? "last" : "first";
    const direction = cursors?.startCursor ? "before" : "after";
    return _.omitBy(
        {
            [limitName]: options.limit,
            [direction]: cursors?.startCursor ?? cursors?.endCursor,
        },
        _.isNil,
    );
}
