const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    fontFamily: {
      "open-sans": ["Open Sans", "sans-serif"],
      "open-sans-condensed": ["Open Sans Condensed", "sans-serif"],
    },
    extend: {
      blur: {
        20: "20px",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      boxShadow: {
        "custom-red":
          "0 10px 15px -3px rgba(128, 0, 0, 0.9), 0 4px 6px -2px rgba(128, 0, 0, 0.05)",
        "custom-blue":
          "0 10px 15px -3px rgba(0, 0, 128, 0.4), 0 4px 6px -2px rgba(0, 0, 128, 0.05)",
        "custom-gray":
          "0 10px 15px -3px rgba(128, 128, 128, 0.4), 0 4px 6px -2px rgba(128, 128, 128, 0.05)",
        "custom-top-gray":
          "0 -10px 15px -3px rgba(128, 128, 128, 0.4), 0 -4px 6px -2px rgba(128, 128, 128, 0.05)",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-2px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(4px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-8px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(8px, 0, 0)" },
        },
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover"],
  },
  plugins: [],
});
