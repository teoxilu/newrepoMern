const withMT = require('@material-tailwind/react/utils/withMT');
const { transform } = require('lodash');
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
            keyframes: {
                textClip: {
                    '0%': { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
                    '100%': { clipPath: ' polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
                },
                imageIn: {
                    '0%': { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
                    '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
                },
                appear: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                slide: {
                    '0%': {
                        transform: 'translateY(-135px)',
                    },
                    '50%': {
                        transform: 'translateY(-5px)',
                    },
                    '100%': {
                        transform: 'translateY(-135px)',
                    },
                },
            },
            animation: {
                textClip: 'textClip 1s 1s cubic-bezier(0.5, 0, 0.1, 1) both',
                imageIn: 'imageIn 1s cubic-bezier(0.5, 0, 0.1, 1) 0s backwards',
                appear: 'appear 1s ease 1s backwards',
                bounceInRight: 'bounce-in-right .8s 1.8s both',
                slide: 'slide 8s infinite'
            },
        },
    },
    plugins: [],
});
