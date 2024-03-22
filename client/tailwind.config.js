const withMT = require('@material-tailwind/react/utils/withMT');
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: ['./src/**/*.{html,js}'],
    theme: {
        corePlugins: {
            preflight: false,
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            light: {
                background: '#fff8f6',
                primary: '#8f0000',
                'primary-container': '#ce1b0f',
                secondary: '#a7382a',
                'secondary-container': '#ff8a78',
                tertiary: '#603f00',
                'tertiary-container': '#8c6112',
                on: {
                    primary: '#ffffff',
                    'primary-container': '#ffffff',
                    secondary: '#ffffff',
                    'secondary-container': '#4a0000',
                    'tertiary-container': '#ffffff',
                    surface: '#281714',
                    'surface-variant': '#5d403b',
                    background: '#281714',
                },
                surface: '#fff8f6',
                'surface-variant': '#ffdad4',
                'surface-container': {
                    lowest: '#ffffff',
                    low: '#fff0ee',
                    medium: '#ffe9e6',
                    high: '#ffe2dd',
                    highest: '#fcdbd6',
                },
                outline: '#916f69',
                'outline-variant': '#e6bdb7',
            },
        },
        extend: {
            opacity: {
                8: '.08',
                12: '.12',
                16: '.16',
            },
        },
    },
    plugins: [],
});
