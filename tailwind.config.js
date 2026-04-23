export default {
  content: [
    "./index.html",
    "./main.tsx",
    "./**/*.tsx",
    "./**/*.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
