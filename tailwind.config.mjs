/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { filter: "drop-shadow(0 0 5px #0096CF)" },
          "50%": { filter: "drop-shadow(0 0 1px #0096CF)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        flicker: "flicker 2s infinite ease-in-out",
        float: "float 3s ease-in-out infinite", 
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0096CF",
        secondary: "#201658",
        tosca: "#20F1EE",
        segaSunset: "var(--sega-sunset)",
        azureRadiance: "var(--azure-radiance)",
        frostedWhisper: "var(--frosted-whisper)",
      },
      fontFamily: {
        japanese: ["go3v2"],
        radjdhani_semibold: ["radjdhani_semibold"],
        radjdhani_medium: ["radjdhani_medium"],
        radjdhani_bold: ["radjdhani_bold"],
        radjdhani_regular: ["radjdhani_regular"],
        radjdhani_light: ["radjdhani_light"],
      },
      scrollBehavior: ["responsive"], // ✅ Pindahkan ke sini
    },
  },
  plugins: [],
};

export default config;