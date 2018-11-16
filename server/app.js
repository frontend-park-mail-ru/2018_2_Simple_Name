const express = require('express');
const uuid = require('uuid/v4');
const path = require('path');
const proxy = require('express-http-proxy');

class Application {
    constructor() {
        this.express = express();
        this.attachRoutes();
    }

    attachRoutes() {
        const app = this.express;

        app.use(express.static('src/'));

        app.set('views', path.join(__dirname, 'src/views/'));
        app.set('view engine', 'pug');

        app.use("*", proxy("http://127.0.0.1:8080", {
        // app.use("*", proxy("http://95.163.209.195:80", {
            proxyReqPathResolver: (req) => {
                return req.originalUrl;
            }
        }));

        app.get('/', (req, res) => {
            res.sendFile(path.resolve('src/index.html'));
        });
    }
}

module.exports = Application;