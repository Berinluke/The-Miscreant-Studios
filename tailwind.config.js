/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        hud: {
          bg: '#050508',
          crimson: '#e51e2b',
          glow: '#ff2a3b',
          bezel: '#f2f3f7',
          bezelDark: '#121217',
          card: 'rgba(20, 8, 12, 0.75)'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
};
