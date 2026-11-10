import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0B0C10", 900: "#101218", 850: "#14161E", 800: "#191C26" },
        surface: { DEFAULT: "#14161E", raised: "#191C26", overlay: "#1E212C" },
        lime: { signal: "#C8F169" },
        paper: "#FAFAF6",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      keyframes: {
        "backdrop-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "dialog-in": {
          from: { opacity: "0", transform: "translateY(14px) scale(.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "palette-in": {
          from: { opacity: "0", transform: "translateY(-10px) scale(.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "window-in": {
          from: { opacity: "0", transform: "translateY(10px) scale(.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "backdrop-in": "backdrop-in .18s ease-out",
        "dialog-in": "dialog-in .24s cubic-bezier(.2,.9,.25,1.15)",
        "palette-in": "palette-in .2s cubic-bezier(.2,.9,.3,1.1)",
        "window-in": "window-in .22s cubic-bezier(.2,.9,.25,1.2)",
        "toast-in": "toast-in .18s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
