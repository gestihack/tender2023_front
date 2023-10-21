/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            fontFamily: {
              sans: 'Proxima Nova',
            },
            colors: {
                gray: "#D4DBE6",
                black: "#060606",
                "pale-black": "#A7A7A7",
                "slate": "#D4DBE6",
                red: '#C92723',
                reddy: '#DB2B21'
            },
        },
    },
    plugins: [],
}
