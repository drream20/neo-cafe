/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./projects/*.html"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        pine: "rgb(var(--pine) / <alpha-value>)",
        leaf: "rgb(var(--leaf) / <alpha-value>)",
        btntext: "rgb(var(--btntext) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Nunito", "Arial", "sans-serif"],
        display: ["Zain", "Segoe UI", "sans-serif"],
      },
      spacing: {
        /* the site uses a couple of values outside Tailwind's default scale */
        "4.5": "1.125rem",
        104: "26rem",
      },
    },
  },
  plugins: [],
};