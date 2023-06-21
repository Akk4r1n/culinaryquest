/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        tablet: "800px",
      },
      borderWidth: {
        1: "1px",
      },
      aspectRatio: {
        "3/4": "3 / 4",
      },
      maxHeight: {
        125: "500px",
      },
      minWidth: {
        150: "150px",
        175: "175px",
        200: "200px",
        250: "250px",
        "calc-1/2": "calc(50% - 8px)",
      },
      width: {
        "calc-1/2": "calc(50% - 8px)",
      },
      maxWidth: {
        "view-screen": "1920px",
      },
      minHeight: {
        350: "350px",
      },
      height: {
        375: "375px",
      },
    },
  },
  plugins: [],
};
