/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        title: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#4f46e5", // bg-brand, text-brand
          dark: "#4338ca",    // hover:bg-brand-dark
          light: "#6366f1",   // accent, border
        },
        surface: "#f9fafb",   // backgrounds
        border: "#e5e7eb",    // borders
        text: {
          base: "#111827",    // default text
          muted: "#6b7280",   // subtext
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};