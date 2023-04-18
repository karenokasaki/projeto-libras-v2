/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        openmenu: {
          "0%": { transform: "scaleX(0)" },
          "10%": { transform: "scaleX(0.1)" },
          "20%": { transform: "scaleX(0.2)" },
          "30%": { transform: "scaleX(0.3)" },
          "40%": { transform: "scaleX(0.4)" },
          "50%": { transform: "scaleX(0.5)" },
          "60%": { transform: "scaleX(0.6)" },
          "70%": { transform: "scaleX(0.7)" },
          "80%": { transform: "scaleX(0.8)" },
          "90%": { transform: "scaleX(0.9)" },
          "100%": { transform: "scaleX(1)" },
        },
        closemenu: {
          "100%": { transform: "scaleX(1)" },
          "90%": { transform: "scaleX(0.9)" },
          "80%": { transform: "scaleX(0.8)" },
          "70%": { transform: "scaleX(0.7)" },
          "60%": { transform: "scaleX(0.6)" },
          "50%": { transform: "scaleX(0.5)" },
          "40%": { transform: "scaleX(0.4)" },
          "30%": { transform: "scaleX(0.3)" },
          "20%": { transform: "scaleX(0.2)" },
          "10%": { transform: "scaleX(0.1)" },
          "0%": { transform: "scaleX(0)" },
        },
      },
      animation: {
        openmenu: "openmenu 0.2s ease-in-out",
        closemenu: "closemenu 0.2 ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@headlessui/react"),
  ],
};
