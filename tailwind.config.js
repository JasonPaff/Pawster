module.exports = {
  content: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx", "public/**/*.html"],
  theme: {
    extend: {
      colors: {},
    },
    fontFamily: {
      body: ["Poppins"],
      logo: ["Rochester"],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
