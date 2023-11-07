/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      extend: {
        fontSize: {
          'md-regular': [
            '16px',
            {
              lineHeight: '24px',
              fontWeight: '400',
            },
          ],
          'md-semi-bold': [
            '16px',
            {
              lineHeight: '24px',
              fontWeight: '600'
            },
          ],
          'lg-semi-bold': [
            '20px',
            {
              lineHeight: '30px',
              fontWeight: '600',
            },
          ],
          'display-lg-semi-bold': [
            '24px',
            {
              lineHeight: '32px',
              fontWeight: '600',
            },
          ],
        }
      }
    },
  },
  plugins: [],
}

