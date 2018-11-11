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

        const users = {};
        const ids = {};

        app.use("*", proxy("http://127.0.0.1:80", {
        // app.use("*", proxy("http://95.163.209.195:80", {
            proxyReqPathResolver: (req) => {
                return req.originalUrl;
            }
        }));

        app.get('/', (req, res) => {
            res.sendFile(path.resolve('src/index.html'));
        });

        app.post('/signup', (req, res) => {
            const password = req.body.password;
            const email = req.body.email;
            const age = req.body.age;
            if (
                !password || !email || !age
                || !password.match(/^\S{4,}$/)
                || !email.match(/@/)
                || !(typeof age === 'number' && age > 10 && age < 100)
            ) {
                return res.status(400).json({ error: 'Не валидные данные пользователя' });
            }
            if (users[email]) {
                return res.status(400).json({ error: 'Пользователь уже существует' });
            }

            const id = uuid();
            const user = {
                password, email, age, score: 0
            };
            ids[id] = email;
            users[email] = user;

            res.status(201).json({ id });
        });

        app.post('/login', (req, res) => {
            const password = req.body.password;
            const email = req.body.email;
            if (!password || !email) {
                return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
            }
            if (!users[email] || users[email].password !== password) {
                return res.status(400).json({ error: 'Не верный E-Mail и/или пароль' });
            }

            const id = uuid();
            ids[id] = email;

            res.status(201).json({ id });
        });
    }
}

module.exports = Application;