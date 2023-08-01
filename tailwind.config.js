/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'text': '#121212',
                'text-dark': '#e7e9e9',
                'background': '#e7e9e9',
                'background-dark': '#121212',
                'primary': '#454a4a',
                'secondary': '#e4e6e7',
                'secondary-dark': '#181a1b',
                'accent': '#7b8284',
                'accent-dark': '#cacdce'
            }
        },
    },
    plugins: [],
}

