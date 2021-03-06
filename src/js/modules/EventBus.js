class Bus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) { // подписываемся на событие
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event, callback) { // отписываемся от события
        this.listeners[event] = this.listeners[event]
            .filter((listener) => {
                return listener !== callback;
            });
    }

    emit(event, data) { // публикуем (диспатчим, эмитим) событие
        this.listeners[event].forEach((listener) => {
            listener(data);
        });
    }
}

export default new Bus();
