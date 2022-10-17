import _ from "lodash";

const CSS_ID_VALID_NUMBER_CHARACTERS = _.range(48, 58).map((v) => String.fromCharCode(v));
const CSS_ID_VALID_ALPHA_CHARACTERS = [
    ..._.range(65, 91).map((v) => String.fromCharCode(v)),
    ..._.range(97, 123).map((v) => String.fromCharCode(v)),
];
const CSS_ID_VALID_CHARACTERS = [...CSS_ID_VALID_ALPHA_CHARACTERS, ...CSS_ID_VALID_NUMBER_CHARACTERS];

export default {
    cssId(len = 16) {
        return (
            _.sample(CSS_ID_VALID_ALPHA_CHARACTERS) +
            [...Array(len - 1).keys()].map(() => _.sample(CSS_ID_VALID_CHARACTERS)).join("")
        );
    },
};
