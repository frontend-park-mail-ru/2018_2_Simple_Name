export default class WsService {
    constructor(url) {
        this.ws = new WebSocket(`wss://${url}`);
        this.listCommands = [];
        this.ws.addEventListener('message',(event) => {
            const msg = JSON.parse(event.data);
            this.listCommands[msg.status](msg);
        });
    }

    onclose(callback) {
        this.ws.addEventListener('close', (event) => {
            let statusText = '';
            if (event.wasClean) {
                statusText = 'Connection was closed by server.';
            } else {
                statusText = 'Something is bad. Check your connection.';
            }
            callback(statusText);
        });
    }

    onerror(callback) {
        this.ws.addEventListener('error',(event) => {
            const statusText = event;
            callback(statusText);
        });
    }

    send(data) {
        this.ws.send(JSON.stringify(data));
    }

    subscribe(command, callback) {
        this.listCommands[command] = callback;
    }
}