import type { Config } from 'tailwindcss'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        text: 'var(--color-text)',
        background: 'var(--color-background)',

        button: 'var(--color-button)',
        buttonHover: 'var(--color-button-hover)',

        navText: 'var(--color-nav-text)',
        navTextHover:'var(--color-nav-text-hover)',
        navTextActive:'var( --color-nav-text-active)',
        navBg:'var(--color-nav-bg)',
        navBgHover:'var( --color-nav-bg-hover)',
        navBgActive:'var(--color-nav-bg-active)',
        navboxHover:'var(--color-nav-box-hover)',
        navboxcheck:'var(--color-nav-box-check)',

        border: 'var(--color-border)',
        shadow: 'var(--color-shadow)',
        highlightText: 'var(--color-highlight-text)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        arial: ['Arial', 'sans-serif'],
        times: ['"Times New Roman"', 'serif'],
        fira: ['"Fira Code"', 'monospace'],
      },

    },
  },
  plugins: [],
} satisfies Config
