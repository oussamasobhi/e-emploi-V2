/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      height: {
        114: "28rem",
        121: "30rem",
        128: "32rem",
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
