import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          black: "#0a0a0a",
          white: "#f5f5f5",
          gray: {
            100: "#e8e8e8",
            200: "#c4c4c4",
            300: "#9a9a9a",
            400: "#6b6b6b",
            500: "#4a4a4a",
            600: "#2e2e2e",
            700: "#1a1a1a",
            800: "#121212",
          },
          cream: "#e8e0d4",
          beige: "#d4c8b8",
        },
      },
      fontFamily: {
        condensed: [
          "var(--font-barlow-condensed)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-barlow-condensed)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        editorial: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        street: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
