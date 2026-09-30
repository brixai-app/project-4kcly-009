export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          'surface-hover': '#F3F0EB',
          border: '#E7E0D6',
          primary: '#222222',
          muted: '#6B645C',
          accent: '#D7C9B6',
          'accent-hover': '#CBB9A3',
          'accent-text': '#000000',
        },
        bg: '#FAF9F6',
        surface: '#FFFFFF',
        'surface-hover': '#F3F0EB',
        accent: '#D7C9B6',
        'accent-hover': '#CBB9A3',
      },
      fontFamily: {
        sans: ['Lora', 'sans-serif'],
        display: ['Playfair Display', 'sans-serif'],
      },
      borderRadius: {
        theme: '14px',
      },
    },
  },
  plugins: [],
};