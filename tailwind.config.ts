import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /fill-.+/,
    },
    {
      pattern: /text-.+/,
    },
    {
      pattern: /border-.+/,
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'fuchsia-500': '#ed21f1',
        'fuchsia-600': '#cd11d1',
        'slate-100': '#f6f7f9',
        'slate-200': '#cbd5e1',
        'slate-300': '#B0BCCE',
        'slate-400': '#4C4D56',
        'slate-600': '#475569',
        'neutral-300': '#A8A9B5',
        'neutral-350': '#8a8a8a',
        'neutral-400': '#656565',
        'neutral-600': '#525252',
        'orange-400': '#FB7F0E',
        'violet-400': '#841AC6',
        'blue-350': '#0EDEFB',
        'blue-400': '#49e6fb',
        'indigo-600': '#4356ff',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1240px',
        '2xl': '1536px',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gradient-loader': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '200% 50%' },
          '100%': { backgroundPosition: '50% 50%' },
        },
      },
      animation: {
        none: 'none',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        spinner: 'spin 60s linear infinite',
        gradient: 'gradient-loader 5s ease infinite',
      },
    },
  },
  plugins: [],
};
export default config;
