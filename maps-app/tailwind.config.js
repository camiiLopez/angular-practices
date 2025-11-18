const { default: themes } = require('daisyui/theme/object');

module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        themes: ['abyss']
    }
}