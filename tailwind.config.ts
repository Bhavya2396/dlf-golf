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
        'primary-navy': '#1A1B35',
        'primary-navy-light': '#2A2B45',
        'secondary-coral': '#FFB7A6',
        'secondary-coral-light': '#FFE4D6',
        'accent-mint': '#7DE1BB',
      },
      fontFamily: {
        'sf-pro-display': ['SF Pro Display', 'sans-serif'],
        'sf-pro-text': ['SF Pro Text', 'sans-serif'],
      },
      fontSize: {
        '32': '2rem',
        '24': '1.5rem',
        '18': '1.125rem',
        '16': '1rem',
        '14': '0.875rem',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};

export default config; 