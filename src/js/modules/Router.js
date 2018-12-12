
(function () {
    class Router {
        constructor() {
            this.routes = {};
        }

        setRoot(root) {
            this.root = root;
        }

        register(path, View) {
            this.routes[path] = {
                View,
                view: null,
                el: null
            };

            return this;
        }

        open(path) {
            const route = this.routes[path];

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

            let {View, view, el} = route;

            if (!el) {

                el = document.createElement('section');
                this.root.appendChild(el);
            }

            if (!view) {
                view = new View(el);
            }

            if (!view.active) {
                Object.values(this.routes).forEach(({view}) => {
                    if (view && view.active) {
                        view.hide();
                    }
                });
                view.show();
            }
            this.routes[path] = {View, view, el};
        }

        start() {
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
                    const gameService = new Game(root, undefined, undefined);
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

    window.RouterModule = new Router();

}());