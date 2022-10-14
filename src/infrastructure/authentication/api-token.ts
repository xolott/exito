import { Authentication } from "@/features/interfaces/authentication";
import _ from "lodash";
import { InvalidTokenError } from "@/features/errors";
import { TokenMasker } from "@/core/masker";

interface ApiTokenAuthenticationOptions {
    httpPrefix?: string;
}

export class ApiTokenAuthentication implements Authentication {
    token: string;
    private options: ApiTokenAuthenticationOptions;

    constructor(token: string, options?: ApiTokenAuthenticationOptions) {
        this.options = _.defaults(options, { httpPrefix: "Bearer" });
        if (_.isNil(token) || _.isEmpty(token)) throw new InvalidTokenError(token);
        this.token = token;
    }

    get httpHeader(): string {
        return `${this.options.httpPrefix} ${this.token}`;
    }

    get safeString(): string {
        return TokenMasker.mask(this.token);
    }
}
