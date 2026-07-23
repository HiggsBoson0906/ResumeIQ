/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f8fafc",
        "on-surface": "#0f172a",
        "on-surface-variant": "#475569",
        primary: "#3b82f6",
        "primary-container": "#bfdbfe",
        "primary-fixed": "#dbeafe",
        "primary-fixed-dim": "#93c5fd",
        "outline-variant": "#cbd5e1",
        "surface-container-low": "#f1f5f9",
        "secondary-container": "#e2e8f0"
      },
      maxWidth: {
        "container-max": "1200px"
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}
