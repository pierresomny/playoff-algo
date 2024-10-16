/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors.js");
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            'header': '#1d1d2b',
            'body': '#d1d5db',
            'background': '#1e1e1e',
            'nav': '#252526',
            'selected-nav': '#37373d',
            'menu': '#333333',
            ...colors
        }
    },
    plugins: [],
}
