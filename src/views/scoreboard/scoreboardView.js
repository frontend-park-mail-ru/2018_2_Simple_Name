import BaseView from '../baseView/baseView.js';
import bus from '../../js/modules/EventBus.js';
import LeaderService from '../../services/LeaderService.js';
import scoreboardTemplate from './scoreboardTemplate.pug';

export default class ScoreboardView extends BaseView {
    constructor(el, router, option) {
        super(el);
        this.users = null;
        this.pagesCount = 0;
        this.pageIndex = option || 0;
        this.onPage = 5;
        this.RouterModule = router;

        bus.on(`users-loaded-${this.pageIndex}`, (data) => {

            this.users = data.users;
            this.pagesCount = Math.ceil(data.count / this.onPage);
            this.renderScoreboard();
        });

        bus.on(`fetch-users-${this.pageIndex}`, async () => {
            const data = await LeaderService.FetchData(this.onPage, this.pageIndex * this.onPage);
            await bus.emit(`users-loaded-${this.pageIndex}`, data);
        });
    }

    render() {
        this.el.innerHTML = '';
        if (!this.users) {
            this.getUsers();
        } else {
            this.renderScoreboard();
        }
    }

    renderScoreboard() {

        const realPage = parseInt(this.pageIndex, 10) + 1;
        this.el.innerHTML = scoreboardTemplate({
            pagesCount: this.pagesCount,
            pageIndex: realPage,
            inputPlayers: this.users,
            active: this.pageIndex
        });
    }

    getUsers() {
        bus.emit(`fetch-users-${this.pageIndex}`);
    }

}