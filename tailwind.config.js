/** @type {import('tailwindcss').Config} */
module.exports = {
 // NOTE: Update this to include the paths to all files that contain Nativewind classes.
 content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
 presets: [require("nativewind/preset")],
 theme: {
  extend: {
   colors: {
    primary: {
     DEFAULT: "#E91E8C",
     light: "#FF80AB",
     soft: "#F48FB1",
     dark: "#880E4F",
     muted: "#FCE4EC",
     surface: {
      light: "#FDF6F9",
      dark: "#1C181A",
     },
   },
   },
  },
 },
 plugins: [],
};
