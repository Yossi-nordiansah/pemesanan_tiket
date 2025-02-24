/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  variants: {
    extend: {
      scrollBehavior: ['responsive'],
    },
  },
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px #0096CF)' },
          '50%': { filter: 'drop-shadow(0 0 1px #0096CF)' },
        },
      },
      animation: {
        flicker: 'flicker 2s infinite ease-in-out',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0096CF",
        secondary: "#201658",
        tosca : "#20F1EE"
      },
      fontFamily: {
        japanese: ["go3v2"],
        radjdhani_semibold : ['radjdhani_semibold'],
        radjdhani_medium:['radjdhani_medium'],
        radjdhani_bold:['radjdhani_bold'],
        radjdhani_regular:['radjdhani_regular'],
        radjdhani_light:['radjdhani_light'],
      },
      scrollBehavior: ['responsive'],
    },
  },
  plugins: [],
};
