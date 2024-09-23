import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: { xs: '380px' },
      fontFamily: {
        busan: ['Busan', 'sans-serif'],
        nanum: ['NanumSquareNeoVariable', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        '68': '4.25rem',
        '48': '3rem',
        '50': '3.125rem',
        '45': '2.8125rem',
        '42': '2.625rem',
        '36': '2.25rem',
        '32': '2rem',
        '30': '1.875rem',
        '28': '1.75rem',
        '24': '1.5rem',
        '22': '1.375rem',
        '20': '1.25rem',
        '18': '1.125rem',
        '16': '1rem',
        '15': '0.9375rem',
        '14': '0.875rem',
        '13': '0.8125rem',
        '12': '0.75rem',
        '10': '0.625rem',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      colors: {
        primary: '#222222',
        etc: '#5c5c5c',
        kebab: '#6b7280',
        testbg: '#637381',
        link: '#dedede',
        white: '#ffffff',
        tertiary: '#A0D1EF',
        secondary: '#ff5100',
        warning: '#D7260D',
        down: '#f1f1f1',
        accent: '#ff4800',
        product: '#F5F5F5',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
