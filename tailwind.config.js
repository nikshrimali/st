/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#FAF8F5', // Ivory
                primary: '#0D0D12', // Obsidian
                accent: '#C9A84C', // Champagne
                textdark: '#2A2A35', // Slate
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                drama: ['"Playfair Display"', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                '2rem': '2rem',
                '3rem': '3rem',
                'pill': '9999px',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
