/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001F3F", // Deep Blue - Represents trust and stability.
        accent: "#2ECC40", // Green - Signifies growth and positive actions.
        background: "#F5F5F5", // Light Gray - Provides a clean and neutral background.
        cta: "#FF851B", // Orange - Grabs attention and encourages action.
        grey: "#333333", // Dark Gray - Ensures readability and professionalism.
      },
    },
  },
  plugins: [],
};
