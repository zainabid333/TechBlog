module.exports = {
  content: [
    "./views/**/*.handlebars", // Include your Handlebars files
    "./public/**/*.js", // Include any JavaScript files in public
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#93c5fd",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
      },
    },
  },
  plugins: [],
};
