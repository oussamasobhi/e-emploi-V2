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
      width: {
        114: "28rem",
        121: "30rem",
        128: "32rem",
        135: "34rem",
        mw: "52rem"
      },
      maxWidth:{
        mw: "52rem"
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
