/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14181F",
        paper: "#EDE7DA",
        navy: "#1B2A4A",
        navyDeep: "#0F1B33",
        amber: "#D98E04",
        rust: "#A63D2F",
        teal: "#3A6B65",
        line: "#C9C0AC",
      },
      fontFamily: {
        display: ["'Roboto Slab'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
      },
    },
  },
  plugins: [],
};
