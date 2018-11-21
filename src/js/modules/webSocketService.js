class WsService {
    constructor(ws) {
        this.ws = ws;
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(enent.data);
            this.listCommands[msg.Status](msg);
        }
    }

    send(data) {
        this.ws.send(JSON.stringify(data))
    }

    subscribe(command, callback) {
        this.listCommands[command] = callback;
    }
}