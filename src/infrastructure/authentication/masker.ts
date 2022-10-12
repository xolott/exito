import * as _ from "lodash";

interface MaskerOptions {
    unmaskStart?: number;
    unmaskEnd?: number;
    maskCharacter?: string;
}

export class Masker {
    _options: MaskerOptions;
    SECURITY_OFFSET = 5;
    constructor(options?: MaskerOptions) {
        this._options = _.defaults(options, { unmaskStart: 0, unmaskEnd: 0, maskCharacter: "*" });
    }

    #duplicateChar(char: string, times: number): string {
        return Array(times).fill(char).join("");
    }

    mask(text: string, options?: MaskerOptions) {
        if (!text) return text;
        const opts = _.defaults(options, this._options) as Required<MaskerOptions>;
        if (!opts.unmaskStart && !opts.unmaskEnd) return this.#duplicateChar(opts.maskCharacter, text.length);
        if (opts.unmaskStart + opts.unmaskEnd + this.SECURITY_OFFSET > text.length)
            return this.#duplicateChar(opts.maskCharacter, text.length);

        const sectionToMask = text.slice(opts.unmaskStart, text.length - opts.unmaskEnd);
        const head = text.slice(0, opts.unmaskStart);
        const tail = text.slice(text.length - opts.unmaskEnd);
        return `${head}${this.#duplicateChar(opts.maskCharacter, sectionToMask.length)}${tail}`;
    }
}

export const TokenMasker = new Masker({
    unmaskEnd: 2,
    unmaskStart: 3,
});
