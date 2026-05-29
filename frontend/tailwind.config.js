/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d8efff",
          200: "#b8e3ff",
          300: "#89d2ff",
          400: "#52b7ff",
          500: "#2796ff",
          600: "#1176f5",
          700: "#0f60e1",
          800: "#144db6",
          900: "#18448f"
        }
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
