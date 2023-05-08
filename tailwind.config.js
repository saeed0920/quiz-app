/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        des: { max: "100em" },
        minDes: { max: "81.25em" },
        tab: { max: "43.75em" },
        phone: { max: "31.25em" },
      },
    },
  },
  plugins: [],
};
