'use strict';

const Application = require('./app');
const config = require('./config.json');

var app = new Application();

app.express.listen(config.port, config.host, function() {
    console.log(`Listening port ${config.port}`);
});