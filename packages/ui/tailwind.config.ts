import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // Pure White & Vivid Matcha Green Palette
        ivory: {
          DEFAULT: "#FFFFFF",
          light: "#FFFFFF",
          warm: "#F7FAF7",
        },
        sand: {
          DEFAULT: "#E8F0E8",
          light: "#F2F7F2",
          dark: "#C8DBC9",
        },
        // Real Fresh Matcha Green
        matcha: {
          DEFAULT: "#2E7D32", // Lush, vivid real matcha green
          light: "#43A047",   // Fresh whisked matcha froth
          dark: "#1B5E20",    // Deep ceremonial matcha
          deep: "#143A18",    // Darkest tea leaf
          vibrant: "#388E3C",
          tint: "#E8F5E9",    // Soft gentle matcha cream
          subtle: "#F1F8F2",  // Very pale clean green
        },
        moss: {
          DEFAULT: "#2E7D32",
          light: "#43A047",
          dark: "#1B5E20",
          tint: "#E8F5E9",
        },
        stone: {
          DEFAULT: "#5A6E5E",
          light: "#E2EBE2",
          hairline: "#E0ECE1",
          dark: "#2A3A2C",
        },
        forest: {
          DEFAULT: "#132A17", // Deep crisp tea leaf forest
          light: "#1E3E23",
          muted: "#3B5C40",
        },
        wood: {
          DEFAULT: "#2E7D32", // Diverted to matcha green per user request
          light: "#43A047",
          dark: "#1B5E20",
          tint: "#E8F5E9",
        },
        // Clean white and crisp green aliases
        cream: "#FFFFFF",    // Pure clean white!
        ink: "#132A17",      // Deep crisp forest
        sage: "#E8F5E9",     // Fresh matcha tint
        hairline: "#E0ECE1", // Clean pale green hairline
        oak: "#2E7D32",      // Diverted to matcha green
      },
      borderRadius: {
        'organic': '1.75rem',
        'zen': '2.25rem',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'subtle': '0 2px 16px -2px rgba(28, 34, 27, 0.04)',
        'zen': '0 8px 32px -4px rgba(28, 34, 27, 0.05)',
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Noto Sans'", "'Noto Sans Thai'", "sans-serif"],
        thai: ["'Noto Sans Thai'", "'Noto Sans'", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config
