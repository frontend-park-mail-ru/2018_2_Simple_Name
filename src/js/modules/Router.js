import ScoreboardView from '../../views/scoreboard/scoreboardView.js';

export default class Router {
    constructor(root) {
        this.routes = {};
        this.root = root;
    }

    register(path, View, option, text = null) {

        let view = null;
        let el = null;

        if (typeof View === "object") {
            view = View;
            el = View.el;
        }

        this.routes[path] = {
            View,
            view,
            el,
            router: this,
            option,
            text
        };


        return this;
    }

    open(path, text = null) {
        let route = this.routes[path];

        if (!route) {
            const regex = /leaders\/([0-9]+)/;
            const res = path.match(regex);
            if (res) {
                this.register(path, ScoreboardView, res[1]);
                route = this.routes[path];
            }
        }

        if (!route) {
            this.open('/');
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(
                null,
                '',
                path
            );
        }


        let { View, view, el, router, option } = route;

        if (!el) {
            el = document.createElement('section');
            this.root.appendChild(el);
        }

        if (!view) {
            view = new View(el, router, option);
        }

        if (view.active && text !== null) {
            view.hide();
        }

        if (view.active) {
            return;
        }
        Object.values(this.routes).forEach(({ view }) => {
            if (view && view.active) {
                view.hide();
            }
        });
        view.show(text);


        this.routes[path] = { View, view, el, router, option };
    }

    start(router) {
        this.root.addEventListener('click', (event) => {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            const link = event.target;

            if (link.pathname === "/startgame") {
                const root = document.getElementById('root');
                root.innerHTML = "";
                const Game = window.GameModule;
                const gameService = new Game(root, router);
                return;
            }

            this.open(link.pathname);
        });

        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;
            this.open(currentPath);
        });

        const currentPath = window.location.pathname;

        this.open(currentPath);
    }
}
