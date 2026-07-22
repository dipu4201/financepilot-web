import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#10B981",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        "dark-background": "#0F172A",
        "dark-card": "#1E293B",
        text: "#111827",
        muted: "#6B7280",
        border: "#E5E7EB",
        accent: "#38BDF8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
