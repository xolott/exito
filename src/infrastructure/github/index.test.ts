import { Github } from "./index";
import { InvalidTokenError } from "@/features/errors";
import { graphql } from "@octokit/graphql";
import fetchMock from "fetch-mock";
import fixtures, { FetchWrapperReturnType } from "./index.fixture";
import { graphql as graphqlType, GraphQlResponse } from "@octokit/graphql/dist-types/types";
import { GitUser } from "../../models/git-user";
import { RequestError } from "@octokit/request-error";
import { GitRepository } from "../../models/git-repository";
import { GitSearchType } from "../../features/interfaces/git-server";

interface GithubTest {
    graphqlWithAuth: graphqlType;
}

describe("GitHub", () => {
    describe("authentication", () => {
        it("throws InvalidToken when no token is provided", () => {
            expect(() => new Github(undefined as unknown as string)).toThrow(InvalidTokenError);
        });
    });

    describe("query", () => {
        it("throws InvalidToken when the token is expired", async () => {
            const github = new Github("1234");
            const spy = mockQueryWith(github, fixtures.badCredentials);
            await expect(github.query("{}")).rejects.toBeInstanceOf(InvalidTokenError);
            spy.mockRestore();
        });

        it("re throws unhandled errors", async () => {
            const github = new Github("1234");
            const errorToThrow = new Error("test-error");
            const spy = mockQueryWith(github, errorToThrow);
            await expect(github.query("{}")).rejects.toBe(errorToThrow);
            spy.mockRestore();
        });

        it("re throws unhandled GitHub errors", async () => {
            const github = new Github("1234");
            const spy = mockQueryWith(github, fixtures.unhandledError);
            await expect(github.query("{}")).rejects.toBeInstanceOf(RequestError);
            spy.mockRestore();
        });
    });

    describe("User Info", () => {
        it("should return current user", async () => {
            const github = new Github("1234");
            const spy = mockQueryWith(github, fixtures.userInfo);
            const user: GitUser = {
                avatarUrl: "MockedURL",
                id: "MockedID",
                username: "MockedLogin",
                name: "MockedName",
            };
            expect(await github.getUserInfo()).toEqual(user);
            spy.mockRestore();
        });
    });

    describe("Search repositories", () => {
        it("should return a list of repositories", async () => {
            const github = new Github("1234");
            const spy = mockQueryWith(github, fixtures.repositories);
            const repositories: GitRepository[] = [
                {
                    id: "MDEwOlJlcG9zaXRvcnkxNTI4MTcyOTU=",
                    name: "nfc-keela",
                    owner: "networksforchange",
                },
                {
                    id: "MDEwOlJlcG9zaXRvcnkxMjA5MDY3Nzc=",
                    name: "keela-blog",
                    owner: "Wiandono",
                },
                {
                    id: "MDEwOlJlcG9zaXRvcnk5MDM3MDcwMg==",
                    name: "Keelan_Neo",
                    owner: "plumskl0",
                },
            ];
            const page = await github.search("valid search", GitSearchType.REPOSITORY);

            expect(page).toHaveProperty("items");
            expect(page).toHaveProperty("hasNextPage");
            expect(page).toHaveProperty("hasPrevPage");
            expect(page).toHaveProperty("next");
            expect(page).toHaveProperty("prev");
            expect(page.items).toHaveLength(3);
            expect(page.items).toEqual(repositories);
            expect(page.hasNextPage).toBeTruthy();
            expect(page.hasPrevPage).toBeFalsy();
            spy.mockRestore();
        });
    });
});

function mockQueryWith(github: Github, response: Error | FetchWrapperReturnType | RequestError) {
    return vi
        .spyOn(github as unknown as GithubTest, "graphqlWithAuth")
        .mockImplementation(async (query: string): Promise<GraphQlResponse<unknown>> => {
            if (response instanceof Error) throw response;
            return await graphql(query, {
                request: {
                    fetch: fetchMock.sandbox().post("https://api.github.com/graphql", () => {
                        if (!response) return response;
                        if (response instanceof RequestError && response.status >= 400)
                            throw new RequestError("Error", response.status, response);
                        return response;
                    }),
                },
            });
        });
}
export {};
