
(function () {
    class Router {
        constructor() {
            this.routes = {};
        }

        setRoot(root) {
            this.root = root;
        }

        /**
         * @param {string} path
         * @param {BaseView} View
         */
        register(path, View) {
            // console.log("registr ");
            // console.log(path);
            this.routes[path] = {
                View: View,
                view: null,
                el: null
            };

            return this;
        }

        /**
         * @param {string} path
         */
        open(path) {
            console.log("open");
            console.log(path);

            const route = this.routes[path];

            if (!route) {
                // console.log("0");
                this.open('/');
                return;
            }
            // console.log("1");

            if (window.location.pathname !== path) {
                // console.log("1.5");
                window.history.pushState(
                    null,
                    '',
                    path
                );
            }
            // console.log("2");

            let {View, view, el} = route;

            if (!el) {
                // console.log("2.5");

                el = document.createElement('section');
                this.root.appendChild(el);
            }
            // console.log("3");

            if (!view) {
                // console.log("3.5");

                view = new View(el);
            }
            // console.log("4");

            if (!view.active) {
                // console.log("4.2");

                Object.values(this.routes).forEach(function ({view}) {
                    if (view && view.active) {
                        view.hide();
                    }
                });
                // console.log("4.5");

                view.show();
            }
            // console.log("5");

            this.routes[path] = {View, view, el};
        }

        start() {
            this.root.addEventListener('click', function (event) {
                if (!(event.target instanceof HTMLAnchorElement)) {
                    return;
                }

                event.preventDefault();
                const link = event.target;

                console.log("pathname = ", link.pathname);

                if (link.pathname === "/startgame") {
                    const root = document.getElementById('root');
                    root.innerHTML = "";
                    const Game = window.GameModule;
                    const gameService = new Game(root, undefined, undefined);
                    return
                }

                this.open(link.pathname);
            }.bind(this));

            window.addEventListener('popstate', function () {
                const currentPath = window.location.pathname;
                this.open(currentPath);
            }.bind(this));

            const currentPath = window.location.pathname;

            this.open(currentPath);
        }
    }
    // const root = document.getElementById('root');

    window.RouterModule = new Router();

}());