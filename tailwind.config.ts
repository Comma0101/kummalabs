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
        korami: {
          black: "#000000",
          gray: "#0D0D0D",
          white: "#FFFFFF",
          border: "#EDEDED",
          accent: "#FF4500", // Vibrant orange for food/AI tech accents
          accentHover: "#E63E00",
        },
      },
      boxShadow: {
        neo: "8px 8px 0px 0px rgba(0,0,0,1)",
        "neo-hover": "4px 4px 0px 0px rgba(0,0,0,1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
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
