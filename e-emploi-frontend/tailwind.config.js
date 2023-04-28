/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        caption : ['PT Sans Caption', 'sans-serif'],
        mukta : ['Mukta', "sans-serif"],
        archivo : ['Archivo Black', 'sans-serif']
      },
      height: {
        114: "28rem",
        121: "30rem",
        128: "32rem",
        135: "34rem",
      },
      colors: {
        lime: "#e0fd2c",
        cyan: "#035772",
        green: "#72aa4f",
      },
      backgroundImage: {
        "hero-bg": "url('public/image/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
