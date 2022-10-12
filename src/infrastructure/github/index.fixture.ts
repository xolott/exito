const badCredentials = {
    status: 401,
    response: {
        url: "https://api.github.com/graphql",
        status: 401,
        headers: {
            "access-control-allow-origin": "*",
            "access-control-expose-headers":
                "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset",
            connection: "close",
            "content-length": "83",
            "content-security-policy": "default-src 'none'",
            "content-type": "application/json; charset=utf-8",
            date: "Sun, 09 Oct 2022 03:19:05 GMT",
            "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
            server: "GitHub.com",
            "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
            vary: "Accept-Encoding, Accept, X-Requested-With",
            "x-content-type-options": "nosniff",
            "x-frame-options": "deny",
            "x-github-media-type": "github.v3; format=json",
            "x-github-request-id": "CD57:6459:48108C5:9362EBE:63423DA9",
            "x-ratelimit-limit": "0",
            "x-ratelimit-remaining": "0",
            "x-ratelimit-reset": "1665289145",
            "x-ratelimit-resource": "graphql",
            "x-ratelimit-used": "0",
            "x-xss-protection": "0",
        },
        data: {
            message: "Bad credentials",
            documentation_url: "https://docs.github.com/graphql",
        },
    },
    request: {
        method: "POST",
        url: "https://api.github.com/graphql",
        headers: {
            accept: "application/vnd.github.v3+json",
            "user-agent": "octokit-graphql.js/5.0.1 Node.js/16.17.1 (darwin; x64)",
            authorization: "token [REDACTED]",
            "content-type": "application/json; charset=utf-8",
        },
        body: '{"query":"\\n                query {\\n                    viewer {\\n                        login\\n                    }\\n                }\\n            "}',
    },
};
const unhandledError = {
    status: 444,
    response: {
        url: "https://api.github.com/graphql",
        status: 444,
        headers: {
            "access-control-allow-origin": "*",
            "access-control-expose-headers":
                "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset",
            connection: "close",
            "content-length": "83",
            "content-security-policy": "default-src 'none'",
            "content-type": "application/json; charset=utf-8",
            date: "Sun, 09 Oct 2022 03:19:05 GMT",
            "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
            server: "GitHub.com",
            "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
            vary: "Accept-Encoding, Accept, X-Requested-With",
            "x-content-type-options": "nosniff",
            "x-frame-options": "deny",
            "x-github-media-type": "github.v3; format=json",
            "x-github-request-id": "CD57:6459:48108C5:9362EBE:63423DA9",
            "x-ratelimit-limit": "0",
            "x-ratelimit-remaining": "0",
            "x-ratelimit-reset": "1665289145",
            "x-ratelimit-resource": "graphql",
            "x-ratelimit-used": "0",
            "x-xss-protection": "0",
        },
        data: {
            message: "Custom Unhandled Error",
            documentation_url: "https://docs.github.com/graphql",
        },
    },
    request: {
        method: "POST",
        url: "https://api.github.com/graphql",
        headers: {
            accept: "application/vnd.github.v3+json",
            "user-agent": "octokit-graphql.js/5.0.1 Node.js/16.17.1 (darwin; x64)",
            authorization: "token [REDACTED]",
            "content-type": "application/json; charset=utf-8",
        },
        body: '{"query":"\\n                query {\\n                    viewer {\\n                        login\\n                    }\\n                }\\n            "}',
    },
};
const repositories = {
    data: {
        search: {
            pageInfo: {
                hasNextPage: true,
                hasPreviousPage: false,
                endCursor: "Y3Vyc29yOjEw",
                startCursor: "Y3Vyc29yOjE=",
            },
            nodes: [
                {
                    id: "MDEwOlJlcG9zaXRvcnkxNTI4MTcyOTU=",
                    name: "nfc-keela",
                    owner: {
                        id: "MDQ6VXNlcjgxNDUxMDc=",
                        login: "networksforchange",
                    },
                },
                {
                    id: "MDEwOlJlcG9zaXRvcnkxMjA5MDY3Nzc=",
                    name: "keela-blog",
                    owner: {
                        id: "MDQ6VXNlcjE3NTcyMjg1",
                        login: "Wiandono",
                    },
                },
                {
                    id: "MDEwOlJlcG9zaXRvcnk5MDM3MDcwMg==",
                    name: "Keelan_Neo",
                    owner: {
                        id: "MDQ6VXNlcjgxMjI4OTE=",
                        login: "plumskl0",
                    },
                },
            ],
        },
    },
};
const userInfo = {
    data: {
        user: {
            avatarUrl: "MockedURL",
            id: "MockedID",
            login: "MockedLogin",
            name: "MockedName",
        },
    },
};
export default { badCredentials, userInfo, unhandledError, repositories };
