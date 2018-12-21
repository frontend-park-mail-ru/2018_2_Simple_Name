import Router from './modules/Router.js';

import ScoreboardView from '../views/scoreboard/scoreboardView.js';
import MenuView from '../views/menu/menuView.js';
import SignInView from '../views/signin/signinView.js';
import SignUpView from '../views/signup/signupView.js';
import AboutView from '../views/about/aboutView.js';
import ProfileView from '../views/profile/profileView.js';
import GameView from '../views/game/gameView.js';
import SingleGameView from '../views/game/singleGameView.js';

import '../static/css/main.sass';
import '../static/css/gamestyles.sass';

import '../swReg.js';

const root = document.getElementById('root');
const router = new Router(root);

router
    .register('/', MenuView)
    .register('/signin', SignInView)
    .register('/signup', SignUpView)
    .register('/profile', ProfileView)
    .register('/leaders', ScoreboardView)
    .register('/about', AboutView)
    .register('/startgame',GameView)
    .register('/singleplayer',SingleGameView);
router.start(router);