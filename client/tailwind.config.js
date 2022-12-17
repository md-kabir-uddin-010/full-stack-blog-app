/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      mxl: { max: "2000px" },
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      mdl: { max: "800px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      "400px": { max: "400px" },
      "350px": { max: "350px" },
      ms: { max: "500px" },
      xs: { max: "320px" },
    },
  },
  plugins: [],
};
