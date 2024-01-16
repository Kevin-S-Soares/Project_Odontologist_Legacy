/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
      },
      gridRowEnd: {
        7: "7",
        11: "11",
        12: "12",
        16: "16",
        17: "17",
        21: "21",
        22: "22",
      },
    },
  },
  plugins: [],
};
