import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        editorial: ['"PP-Editorial-New"', "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
