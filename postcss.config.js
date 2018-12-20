const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        cssnano({
            preset: 'default'
        }),
        autoprefixer({
            browsers: ['ie >= 8', 'last 4 version']
        })
    ]
};