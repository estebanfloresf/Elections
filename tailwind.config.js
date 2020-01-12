module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    extend: {}
  },
  variants: {
    appearance: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus"],
    fill: []
  },
  plugins: [
    require("tailwindcss-transforms"),
    require("tailwindcss-transitions"),
    require("tailwindcss-border-gradients")
  ]
};
