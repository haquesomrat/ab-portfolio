import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/navbar.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        p: {
          900: "hsl(var(--p-900))",
          800: "hsl(var(--p-800))",
          700: "hsl(var(--p-700))",
          600: "hsl(var(--p-600))",
          500: "hsl(var(--p-500))",
          400: "hsl(var(--p-400))",
          300: "hsl(var(--p-300))",
        },
        t: {
          900: "hsl(var(--t-900))",
          800: "hsl(var(--t-800))",
          700: "hsl(var(--t-700))",
          600: "hsl(var(--t-600))",
          500: "hsl(var(--t-500))",
          400: "hsl(var(--t-400))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      boxShadow: {
        bubble: "0px 0px 11px 0px rgba(255, 255, 255, 0.2) inset",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => {
            const smallSvg = svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            );
            const largeSvg = svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="220" height="220" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            );

            return {
              backgroundImage: `url("${smallSvg}")`,
              "@media (min-width: 768px)": {
                backgroundImage: `url("${largeSvg}")`,
              },
            };
          },
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};
export default config;
