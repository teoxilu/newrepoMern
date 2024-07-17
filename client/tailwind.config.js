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
                error: '#ba1a1a',
                'error-container': '#ffdad6',
                on: {
                    primary: '#ffffff',
                    'primary-container': '#ffffff',
                    secondary: '#ffffff',
                    'secondary-container': '#4a0000',
                    'tertiary-container': '#ffffff',
                    surface: '#281714',
                    'surface-variant': '#5d403b',
                    background: '#281714',
                    error: '#ffffff',
                    'error-container': '#410002',
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
                slideUpFade: {
                    '0%': {
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                    '100%': {
                        transform: 'translateY(-16px)',
                        opacity: 0,
                    },
                },
                slideInFade: {
                    '0%': {
                        transform: 'translateY(16px)',
                        opacity: 0,
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                },
                rollOut: {
                    '0%': {
                        transform: 'translate(0) rotate(0)',
                    },
                    '20%': {
                        transform: 'translate(0) rotate(-70deg)',
                        opacity: 1,
                    },
                    '50%': {
                        transform: 'translate(0) rotate(-45deg)',
                        opacity: 1,
                    },
                    '100%': {
                        transform: 'translate(140px) rotate(-47deg)',
                        opacity: 0,
                    },
                },
                changeColor: {
                    '100%': {
                        backgroundColor: '#16a34a',
                    },
                },
            },
            animation: {
                textClip: 'textClip 1s 1s cubic-bezier(0.5, 0, 0.1, 1) both',
                imageIn: 'imageIn 1s cubic-bezier(0.5, 0, 0.1, 1) 0s backwards',
                appear: 'appear 1s ease 1s backwards',
                bounceInRight: 'bounce-in-right .8s 1.8s both',
                slideUpFade: 'slideUpFade 150ms 1 both',
                slideInFade: 'slideInFade 300ms 1 1150ms both',
                rollOut: 'rollOut 1s 1 150ms ease-in both',
                changeColor: 'changeColor 150ms 1 1300ms cubic-bezier(0.4, 0, 0.2, 1) both',
            },
        },
    },
    plugins: [],
});
