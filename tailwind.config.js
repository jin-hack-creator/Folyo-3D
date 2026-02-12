/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark': {
                    900: '#0a0a0f',
                    800: '#12121a',
                    700: '#1a1a25',
                    600: '#252533',
                },
                'accent': {
                    primary: '#3b82f6',
                    secondary: '#8b5cf6',
                    success: '#10b981',
                    warning: '#f59e0b',
                }
            },
            backdropBlur: {
                'glass': '20px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'neon': '0 0 20px rgba(59, 130, 246, 0.5)',
            }
        },
    },
    plugins: [],
}
