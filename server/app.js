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

        app.use(express.static('src/'));

        app.set('views', path.join(__dirname, 'src/views/'));
        app.set('view engine', 'pug');

        const users = {};
        const ids = {};

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

        app.get('/scoreboard', (req, res) => {
            const scorelist = Object.values(users)
                .sort((l, r) => r.score - l.score)
                .map(user => ({
                    email: user.email,
                    age: user.age,
                    score: user.score
                }));

            res.json(scorelist);
        });
    }
}


module.exports = Application;
