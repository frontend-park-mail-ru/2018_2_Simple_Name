import BaseView from '../baseView/baseView.js';
import bus from '../../js/modules/EventBus.js';
import GameService from '../../services/gameService.js';

export default class SingleGameView extends BaseView {
    constructor(el, router) {
        super(el);
        this.RouterModule = router;
        bus.on('startgame', async (text) => {
            this.el.innerHTML = '';
            const gameService = new GameService(this.el, this.backToMenu.bind(this), true);
        });
    }

    backToMenu(text){
        this.RouterModule.open('/', text);
        console.log('backToMenu');
        location.reload();//для удаления обЬекта игры
        console.log('reload');
    }

    render(text) {
        bus.emit('startgame', text);
    }

}