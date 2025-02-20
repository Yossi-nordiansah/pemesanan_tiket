/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0096CF",
        secondary: "#201658",
        tosca : "#20F1EE"
      },
      fontFamily: {
        japanese: ["go3v2"]
      },
    },
  },
  plugins: [],
};
