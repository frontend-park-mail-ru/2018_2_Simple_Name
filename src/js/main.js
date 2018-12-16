import bus from './modules/EventBus.js';
import Router from './modules/Router.js';
import WSservise from "./modules/webSocketService.js";
import GameAnimation from "./game/models/animation.js";
import LeaderService from "../services/LeaderService.js";
import Game from "./game/models/gameService.js";

import ScoreboardView from '../views/scoreboard/scoreboardView.js';
import MenuView from '../views/menu/menuView.js';
import SignInView from '../views/signin/signinView.js';
import SignUpView from '../views/signup/signupView.js';
import AboutView from '../views/about/aboutView.js';
import ProfileView from '../views/profile/profileView.js';

import '../static/css/main.css';
import '../static/css/gamestyles.css';

import '../swReg.js';

// import './game/models/animation.js';
// import './game/models/gameService.js';

const root = document.getElementById('root');

// const Game = window.GameModule;

// const router = new Router(root);
// const router = window.RouterModule;

// router.setRoot(root);
const router = new Router(root);
console.log(router);
router
    .register('/', MenuView)
    .register('/signin', SignInView)
    .register('/signup', SignUpView)
    .register('/profile', ProfileView)
    // .register(new RegExp('/leaders\/([0-9]+)'), ScoreboardView)
    // .register('/leaders/{page}', ScoreboardView)
    .register('/leaders', ScoreboardView)
    .register('/about', AboutView);
// .register('/startgame', GameView);
router.start();


// function createStartgame() {
//
//     httpRequest.doGet({
//         url: backUrl + '/islogged',
//         callback(res) {
//             let errText = "";
//             switch (res.status) {
//                 case 401:
//                     errText = 'You are not logged in';
//                     createSignIn(errText);
//                     break;
//                 case 200:
//                     root.innerHTML = "";
//                     const gameService = new Game(root, createProfile, createMenu);
//                     break;
//                 default:
//                     console.log("Default");
//             }
//         }
//     });
// }
