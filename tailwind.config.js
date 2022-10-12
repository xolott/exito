const palette = {
    spaceCadet: "#2b2d42ff",
    manatee: "#8d99aeff",
    cultured: "#edf2f4ff",
    imperialRed: "#ef233cff",
    amaranthRed: "#d90429ff",
    /* CSS HEX */
    darkLava: "#4a4238ff",
    davysGrey: "#4d5359ff",
    steelTeal: "#508484ff",
    etonBlue: "#79c99eff",
    yellowGreen: "#97db4fff",
};

const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        colors: {
            ...colors,
            ...palette,
            primary: palette.steelTeal,
        },
        extend: {},
    },
    plugins: [],
};
/* SCSS HEX */
