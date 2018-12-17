const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
      autoprefixer({
        browsers: ['ie >= 8', 'last 4 version']
      })
    ]
}