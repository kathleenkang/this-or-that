module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["roboto", "Noto Sans KR", "sans-serif"],
      },
      colors: {
        blue: "#0000ff",
      },
    },
  },
  plugins: [],
};
