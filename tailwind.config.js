module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx", "public/**/*.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        accent: {
          red: "#DB3D3D",
          green: "#00935A",
        },
        background: {
          light: "#F6F6F6",
          darker: "#E8E4E3",
        },
        grayout: {
          lighter: "#AD0D0D0",
          darker: "#A0A0A0",
        },
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
