import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        editor: {
          bg: "#1e1e2e",
          sidebar: "#252536",
          panel: "#2a2a3c",
          border: "#363649",
          text: "#cdd6f4",
          muted: "#6c7086",
          accent: "#89b4fa",
          purple: "#cba6f7",
          green: "#a6e3a1",
          red: "#f38ba8",
          yellow: "#f9e2af",
          blue: "#89b4fa",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
