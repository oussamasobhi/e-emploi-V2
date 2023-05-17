/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        caption : ['PT Sans Caption', 'sans-serif'],
        mukta : ['Mukta', "sans-serif"],
        archivo : ['Archivo Black', 'sans-serif'],
        wix: ['Wix Madefor Display', 'sans-serif']
      },
      height: {
        114: "28rem",
        121: "30rem",
        128: "32rem",
        135: "34rem",
        myHeight: "35rem"
      },
      minHeight: {
        myHeight: "35rem"
      },
      width: {
        114: "28rem",
        121: "30rem",
        128: "32rem",
        135: "34rem",
        w1: "46rem",
        mw: "52rem"
      },
      maxWidth:{
        mw: "52rem"
      },
      backgroundImage: {
        "hero-bg": "url('public/image/hero-bg.jpg')",
      },
      colors:{
        'my-blue': '#063970'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
