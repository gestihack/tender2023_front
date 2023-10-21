/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                gray: "#D4DBE6",
                black: "#060606",
                "pale-black": "#A7A7A7",
                "slate": "#D4DBE6",
            },
        },
    },
    plugins: [],
}
