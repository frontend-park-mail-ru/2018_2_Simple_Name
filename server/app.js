'use strict';


const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();


class Application {
    constructor() {
        this.expressApp = express();
        this.attachRoutes();
    }

    attachRoutes() {
        let app = this.expressApp;
        let jsonParser = body.json();
        app.use(express.static('./src/static/'));

        const users = {};
        const ids = {};

        app.get('/', function (req, res) {
            res.cookie("session_expires","1",{expires:new Date(Date.now()+ 500),httpOnly:true})
            res.sendFile(path.resolve('./src/index.html'));
        });

        app.post('/signup', function (req, res) {
            const password = req.body.password;
            const email = req.body.email;
            const age = req.body.age;
            if (
                !password || !email || !age ||
                !password.match(/^\S{4,}$/) ||
                !email.match(/@/) ||
                !(typeof age === 'number' && age > 10 && age < 100)
            ) {
                return res.status(400).json({ error: 'Не валидные данные пользователя' });
            }
            if (users[email]) {
                return res.status(400).json({ error: 'Пользователь уже существует' });
            }

            const id = uuid();
            const user = { password, email, age, score: 0 };
            ids[id] = email;
            users[email] = user;

            res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
            res.status(201).json({ id });
        });

        app.post('/login', function (req, res) {
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

            res.cookie('sessionid', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
            res.status(201).json({ id });
        });

        app.get('/leaders', function (req, res) {
            const scorelist = Object.values(users)
                .sort((l, r) => r.score - l.score)
                .map(user => {
                    return {
                        email: user.email,
                        age: user.age,
                        score: user.score,
                    }
                });

            res.json(scorelist);
        });
    }


}


module.exports = Application;