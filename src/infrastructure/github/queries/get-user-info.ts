export interface GHGetUserInfoResponse {
    user: {
        avatarUrl: string;
        id: string;
        login: string;
        name: string;
    };
}

export const GHGetUserInfoQuery = `query { 
        user(login: "xolott") { 
            avatarUrl
            id
            login
            name
        }
    }`;
