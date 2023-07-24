/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            dark: "#1b1b1b",
            light: "#f5f5f5",
            "gradient-bg-light1": "#8294C4",
            "gradient-bg-light2": "#DAF5FF",
            "light-primary1": "#54DDE6",
            "light-primary2": "#F9F9F9",

            "gradient-bg-dark1": "#810CA8",
            "gradient-bg-dark2": "#2D033B",
            "dark-primary1": "#C147E9",
            "dark-primary2": "#E5B8F4",
        },
    },

    // eslint-disable-next-line no-undef
    plugins: [require("@tailwindcss/forms")],
    darkMode: "class",
};
