const { default: daisyui } = require('daisyui');

module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        styled: true,
        themes: ['abyss'],
        rtl: false
    }
}