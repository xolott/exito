import { GHGetUserInfoResponse, GHGetUserInfoQuery } from "@/infrastructure/github/queries/get-user-info";

export enum GHQueryType {
    GET_USER_INFO = "get_user_info",
}

export interface GHQueryResponses {
    [GHQueryType.GET_USER_INFO]: GHGetUserInfoResponse;
}
export const GHQuery = {
    [GHQueryType.GET_USER_INFO]: GHGetUserInfoQuery,
};
