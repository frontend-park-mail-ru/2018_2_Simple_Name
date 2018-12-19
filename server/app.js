const express = require('express');
const uuid = require('uuid/v4');
const path = require('path');

class Application {
    constructor() {
        this.express = express();
        this.attachRoutes();
    }

    attachRoutes() {
        const app = this.express;

        app.use('/static', express.static('dist', {setHeaders(res, path, stat) {
            res.set('Service-Worker-Allowed', '/');
        }}));

        app.set('views', path.join(__dirname, 'src/views/'));
        app.set('view engine', 'pug');

        app.get('/favicon.ico', (req, res) => {
            res.sendfile(path.resolve('src/static/favicon.ico'));
        });

        app.get('*', (req, res) => {
            res.sendFile(path.resolve('dist/index.html'));
        });

    }
}

module.exports = Application;