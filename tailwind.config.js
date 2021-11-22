module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        "2xs": "200px",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["last", "first"],
    },
  },
  plugins: [],
};
