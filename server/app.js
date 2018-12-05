const express = require('express');
const uuid = require('uuid/v4');
const path = require('path');
const proxy = require('express-http-proxy');
// var proxyMiddleware = require('http-proxy-middleware');


class Application {
    constructor() {
        this.express = express();
        this.attachRoutes();
    }

    attachRoutes() {
        const app = this.express;

        // var proxy = proxyMiddleware('http://95.163.209.195:80', {
        //     changeOrigin: true,
        //     ws: true
        // });
        // app.use(proxy)

        app.use(express.static('src/'));

        app.set('views', path.join(__dirname, 'src/views/'));
        app.set('view engine', 'pug');


        // app.use("*", proxy("http://127.0.0.1:8080", {
        // app.use("*", proxy("http://95.163.209.195:80", {
        //     proxyReqPathResolver: (req) => {
        //         return req.originalUrl;
        //     }
        // }));

        // proxyServer.on('upgrade', function (req, socket, head) {
        //     proxy.ws(req, socket, head);
        //   });

        app.get('*', (req, res) => {
            res.sendFile(path.resolve('src/index.html'));
        });

    }
}

module.exports = Application;