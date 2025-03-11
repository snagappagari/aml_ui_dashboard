/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"], // Add Lexend Deca globally
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "#424344",
        basegray: "#FBFBFC",
        base: "#FFFFFF",
        customGreen: "#4EAD2C",
        sidebarHover: "#EFB442",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
