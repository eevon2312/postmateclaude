import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fececa',
          300: '#fdaaa5',
          400: '#fa7871',
          500: '#f14e45',
          600: '#de2f26',
          700: '#bb241c',
          800: '#9a211a',
          900: '#80211c',
        },
      },
      fontFamily: {
        handwriting: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
