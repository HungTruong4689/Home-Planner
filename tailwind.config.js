/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            height: {
                '1/10': '10%',
                '9/10': '90%',
            },
            // width:{
            //     '1/8':"",

            // },
            gridTemplateRows: {
                // Simple 8 row grid
                7: 'repeat(7, minmax(0, 1fr))',
            },
            // color: {
            //     default: '#98a6ad',
            //     highlight: '#ffbd4a',
            //     'header-highlight': '#2dc4b9',
            //     trash: '#e51919',
            //     header: '#36404a',
            //     body: '#2c343a',
            //     canvas: '#232323',
            //     ...colorCategory,
            // },

            textColor: {
                default: '#98a6ad',
                highlight: '#ffbd4a',
                'header-highlight': '#2dc4b9',
                trash: '#e51919',
                activate: '#34d3eb',
                resume: '#FFBF00',
                annoMode: '#6957E0',
                normalMode: '#444E5E',
                gtColor: '#FBE5C5',
                title: '#EBEBEC',
                maBtn: '#81C868',
                userText: '#6AC550',
            },
            borderColor: {
                default: '#424242',
                highlight: '#ffbd4a',
                'header-highlight': '#2dc4b9',
                line: 'rgba(255, 255, 255, 0.2)',
                customWhite: 'rgba(255, 255, 255, 0.07)',
                activate: '#34d3eb',
                resume: '#FFBF00',
                annoMode: '#6957E0',
                normalMode: '#444E5E',
                roundedBorder: '#434F58',
                gtColor: '#FBE5C5',
                maBtn: '#81C868',
            },
            backgroundColor: {
                header: '#35414b',
                body: '#2c343a',
                highlight: '#ffbd4a',
                canvas: '#232323',
                error: '#F05050',
                success: '#34e3db',
                gridCard: '#2b333b',
                activate: '#34d3eb',
                resume: '#FFBF00',
                annoMode: '#6957E0',
                normalMode: '#444E5E',
                gtColor: '#FBE5C5',
                modelCan: '#3E4A53',
                maBtn: '#81C868',
            },
        },
    },
    plugins: [],
}
