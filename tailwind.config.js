/** @type {import('tailwindcss').config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          default: "#ff9c01",
          100: "#ff9001",
          200: "#ff8e01",
        },
        black: {
          default: "#000",
          100: "#1e1e2d",
          200: "#232533",
        },
        gray: {
          100: "#cdcde0",
        },
        custom: "#723FEB",
        customGreen: "#9EDA6F",
        customBackground: "#202020",
        customBorder: "rgba(158, 218, 111, 0.4)",
        customBorderwhite: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
