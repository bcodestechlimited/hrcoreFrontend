/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
    colors: {
      main: "#2A72A8",
      secondary: "#F72585",
      plain: "#1C1C1C"
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar-hide")],
};
