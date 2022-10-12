export class InvalidTokenError extends Error {
    constructor(token: string) {
        super(`Token ${token} is invalid`);
    }
}
