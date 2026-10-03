import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0e1a",
        panel: "#141829",
        panel2: "#1b2038",
        border: "#2a3152",
        gold: "#f5c344",
        xp: "#5b8def",
        accent: "#7c5cff",
      },
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(124, 92, 255, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
