import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // KummaLabs studio pages (src/app/studio)
        paper: "#f4f5f0",
        sheet: "#fbfbf8",
        ink: "#18233a",
        graphite: "#5a6273",
        rule: "#d5d8d0",
        pass: { DEFAULT: "#1e7a4f", soft: "#e3efe7" },
        hold: { DEFAULT: "#8a5a12", soft: "#f6ead3" },
        mark: { DEFAULT: "#c9371f", soft: "#fbe7e1" }, // vermilion: annotation / selection only
        korami: {
          black: "#111216", // Deep charcoal instead of pure black
          gray: "#1C1E24", // Softer dark gray
          white: "#FAFAFA", // Apple-style off-white
          border: "#EAEAEC", // Softer border cream
          accent: "#E13725", // Prosperity Red-Orange
          accentHover: "#C82D1D", // Deeper red for hovers
          success: "#2E8B57", // Sage green for positive actions
          trustBlue: "#0F172A", // Deep tech blue for b2b security/reliability
          gold: "#D4AF37", // Prestige Gold for ROI and value
        },
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(17,18,22,1)', // Hard, unblurred shadow
        'neo-hover': '8px 8px 0px 0px rgba(17,18,22,1)', // Pronounced lifted hard shadow
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"], // Grotesk for headers
        zh: ["var(--font-noto-sc)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flowDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.4)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "flow-down": "flowDown 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "marquee": "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
