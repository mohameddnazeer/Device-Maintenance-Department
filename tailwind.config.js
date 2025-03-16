const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(autocomplete|button|chip|form|input|modal|ripple|spinner|listbox|divider|popover|scroll-shadow).js"
  ],

  theme: {
    extend: {
      colors: {
        "custom-gray": "#293038",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "light-background": "hsl(var(--light-background))",
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
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    heroui({
      themes: {
        light: {
          colors: {
            default: {
              50: "#fafafa",
              100: "#f2f2f3",
              200: "#ebebec",
              300: "#e3e3e6",
              400: "#dcdcdf",
              500: "#d4d4d8",
              600: "#afafb2",
              700: "#8a8a8c",
              800: "#656567",
              900: "#404041",
              foreground: "#000",
              DEFAULT: "#d4d4d8",
            },
            content1: {
              DEFAULT: "#ffffff",
              foreground: "#000",
            },
            content2: {
              DEFAULT: "#f4f4f5",
              foreground: "#000",
            },
            content3: {
              DEFAULT: "#e4e4e7",
              foreground: "#000",
            },
            content4: {
              DEFAULT: "#d4d4d8",
              foreground: "#000",
            },
          },
        },
        dark: {
          colors: {
            default: {
              50: "#1b1f24",
              100: "#22282e",
              200: "#293038",
              300: "#4e545b",
              400: "#74787e",
              500: "#999da0",
              600: "#bfc1c3",
              700: "#e4e5e6",
              800: "#e4e5e6",
              900: "#e4e5e6",
              foreground: "#fff",
              DEFAULT: "#293038",
            },
            content1: {
              DEFAULT: "#1b1f24",
              foreground: "#fff",
            },
            content2: {
              DEFAULT: "#22282e",
              foreground: "#fff",
            },
            content3: {
              DEFAULT: "#293038",
              foreground: "#fff",
            },
            content4: {
              DEFAULT: "#4e545b",
              foreground: "#fff",
            },
          },
        },
      },

      layout: {
        disabledOpacity: "0.5",
        radius: {
          small: "0.25rem",
          medium: "0.5rem",
          large: "0.75rem",
        },
      },
    }),
  ],
};
