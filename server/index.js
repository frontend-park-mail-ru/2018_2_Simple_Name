const Application = require('./app');
const config = require('./config.json');

const app = new Application();

app.express.listen(config.port, () => {
    console.log(`Listening port ${config.port}`);
});
