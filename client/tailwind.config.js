export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0047ff',
          600: '#0040e6',
          700: '#0039cc',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#00d4ff',
          600: '#00bfe6',
          700: '#00aacc',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#141e41',
          600: '#121b3a',
          700: '#0f1833',
        },
        light: {
          50: '#fafafa',
          100: '#f4f4f5',
          500: '#9695a7',
          600: '#868596',
          700: '#767585',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0047ff 0%, #00d4ff 100%)',
        'gradient-dark': 'linear-gradient(135deg, #141e41 0%, #0047ff 100%)',
      }
    },
  },
  plugins: [],
};
