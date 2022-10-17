const palette = {
    // Other options #82b185 #6c74c7 #fca321 #387473 #4d5785
    "blue-bell": {
        50: "#f8f7fb",
        100: "#f1f0f7",
        200: "#e7e3f1",
        300: "#d3cde5",
        400: "#bbafd6",
        500: "#9f8cc2",
        600: "#8e75b2",
        700: "#7d629f",
        800: "#685285",
        900: "#57446e",
    },
    "waikawa-gray": {
        50: "#f5f6fa",
        100: "#ebecf3",
        200: "#d2d5e5",
        300: "#abb2ce",
        400: "#7e89b2",
        500: "#5e6b99",
        600: "#4d5785",
        700: "#3d4467",
        800: "#353b57",
        900: "#30344a",
    },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: palette["blue-bell"],
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
/* SCSS HEX */
