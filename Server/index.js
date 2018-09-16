const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
/*
const xhr = new XMLHttpRequest();
*/

app.use(express.static('/home/grigory/Projects/Front1/src/public'));

app.listen(3000);

const leaders = {
    'vanya12@mail.ru':{
        nickname: 'Vano123',
        score: 123
    },
    'nyasha69@ya.ru':{
        nickname: 'Nyasha13',
        score: 14233
    },
    'pol84@bk.ru':{
        nickname: 'PolPol',
        score: 0
    }
};


app.get('/', function (req, res) {
    res.sendFile('/home/grigory/Projects/Front1/src/index.html');

    /*
        res.sendFile(path.join(__dirname+'public/index.html'));
    */
});

app.post('/liderboards', function (req,res) {
    /*xhr.open('post', '', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send()*/
    res.json(leaders);

});


