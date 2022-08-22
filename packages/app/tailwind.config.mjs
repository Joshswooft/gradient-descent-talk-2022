/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],
  plugins: [],
  theme: {
    extend: {},
  },
  purge: ["./index.html", "./src/**/*.{svelte,js,ts}"], // for unused CSS
  variants: {
    extend: {},
  },
};
