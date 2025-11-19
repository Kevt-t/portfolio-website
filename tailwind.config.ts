import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        win11: {
          bg: {
            light: '#F3F3F3',
            dark: '#202020',
          },
          accent: {
            light: '#0067C0',
            dark: '#4CC2FF',
          },
          taskbar: {
            light: '#F3F3F3CC',
            dark: '#1F1F1FCC',
          },
          surface: {
            light: '#FFFFFF',
            dark: '#2C2C2C',
          },
          text: {
            light: '#000000',
            dark: '#FFFFFF',
          },
        },
      },
      fontFamily: {
        'segoe': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backdropBlur: {
        'win11': '30px',
      },
      borderRadius: {
        'win11': '8px',
        'win11-sm': '4px',
      },
      boxShadow: {
        'win11': '0 8px 16px rgba(0, 0, 0, 0.14)',
        'win11-lg': '0 16px 32px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
}
export default config
