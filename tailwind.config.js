const plugin = require("tailwindcss/plugin");
const {
  iconsPlugin,
  getIconCollections,
  dynamicIconsPlugin
} = require("@egoist/tailwindcss-icons");

/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  experimental: {
    darkModeVariant: true,
    matchVariant: true
  },
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["media", "[data-mantine-color-scheme='dark']"],
  theme: {
    typography: require("./typography"),
    extend: {
      colors: {
        gray: {
          25: "#fcfcfd",
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#eaecf0",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          700: "#475467",
          600: "#344054",
          800: "#1d2939",
          900: "#101828"
        },
        primary: {
          25: "#f5f8ff",
          50: "#eff4ff",
          100: "#d1e0ff",
          200: "#b2ccff",
          300: "#84adff",
          400: "#528bff",
          500: "#1FC6FF",
          600: "#155eef",
          700: "#004eeb",
          800: "#0040c1",
          900: "#00359e"
        },
        blue: {
          500: "#E1EFFE"
        },
        green: {
          50: "#F3FAF7",
          100: "#DEF7EC",
          800: "#03543F"
        },
        yellow: {
          100: "#FDF6B2",
          800: "#723B13"
        },
        purple: {
          50: "#F6F5FF",
          200: "#DCD7FE"
        },
        indigo: {
          25: "#F5F8FF",
          50: "#EEF4FF",
          100: "#E0EAFF",
          300: "#A4BCFD",
          400: "#8098F9",
          600: "#444CE7",
          800: "#2D31A6"
        }
      },
      screens: {
        mobile: "100px",
        // => @media (min-width: 100px) { ... }
        tablet: "640px", // 391
        // => @media (min-width: 600px) { ... }
        pc: "769px"
        // => @media (min-width: 769px) { ... }
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        sm: "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        md: "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)",
        lg: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
        xl: "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
        "2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
        "3xl": "0px 32px 64px -12px rgba(16, 24, 40, 0.14)"
      },
      opacity: {
        2: "0.02",
        8: "0.08"
      },
      fontSize: {
        "2xs": "0.625rem"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("tailwindcss-dark-mode"),
    require("tailwind-scrollbar"),
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: getIconCollections([
        "material-symbols-light",
        "mdi",
        "lucide"
      ])
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections("all"),
      // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
    dynamicIconsPlugin(),
    plugin(({ addUtilities, addVariant, e }) => {
      addUtilities({
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      });
      addVariant("data-active", "&[data-active]");
      addVariant("data-selected", "&[data-selected]");
      addVariant("data-hovered", "&[data-hovered]");
      addVariant("disabled", "&:disabled");
      addVariant("dark", ({ modifySelectors, separator }) => {
        console.log(separator);
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`;
        });
      });
    })
  ],
  variants: {
    extend: {
      textOpacity: ["dark"],
      textColor: ["dark"]
    }
  }
};
