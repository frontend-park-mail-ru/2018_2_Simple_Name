import ScoreboardView from '../../views/scoreboard/scoreboardView.js';

export default class Router {
    constructor(root) {
        this.routes = {};
        this.root = root;
    }

    // setRoot(root) {
    //     this.root = root;
    // }

    register(path, View, option, text = null) {
        // console.log("Registr: ", path);
        // console.log("Type: ", typeof View);

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
        console.log("Open: ", path);


        // const route = this.routes[path];
        let route = this.routes[path];

        if (!route) {
            const regex = /leaders\/([0-9]+)/;
            const res = path.match(regex);
            // let option = 0;
            //
            if (res) {
                console.log(res);
                //     const view = new ScoreboardView(option = res[1]);
                this.register(path, ScoreboardView, res[1]);
                // option = res[1];
                route = this.routes[path];
            }
        }


        // for (const key in this.routes){
        //     console.log("Key: ", key);
        //     console.log(path.match(key));
        // }
        // const match = new RegExp(`^${path}`).exec(path); // с помощью регулярного выражения получаем массив строк


        // if (path.search(regex)) {
        //     this.register(path, ScoreboardView, )
        // }

        console.log("Exist: ", route);
        // console.log("RegExp: ", regex);

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



        let {View, view, el, router, option} = route;

        if (!el) {
            el = document.createElement('section');
            this.root.appendChild(el);
        }

        if (!view) {
            view = new View(el, router, option);
        }

        console.log("Active: ", view.active);

        if (view.active && text !== null) {
            view.hide();
        }

        console.log("Active: ", view.active);

        if (view.active) {
        } else {
            Object.values(this.routes).forEach(({view}) => {
                if (view && view.active) {
                    view.hide();
                }
            });
            view.show(text);
        }

        this.routes[path] = {View, view, el, router, option};
    }

    start(router) {
        this.root.addEventListener('click', (event) => {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            const link = event.target;

            console.log(link.pathname);

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

// window.RouterModule = new Router();
