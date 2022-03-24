module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx", "public/**/*.html"],
  theme: {
    extend: {
      colors: {
        accent: {
          red: "#DB3D3D",
          green: "#00935A",
        },
        background: {
          light: "#F6F6F6",
          darker: "#EAE2E0",
        },
        grayout: "#A0A0A0",
      },
    },
    fontFamily: {
      body: ["Poppins"],
      logo: ["Rochester"],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
