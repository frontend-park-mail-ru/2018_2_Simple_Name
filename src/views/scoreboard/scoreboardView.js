import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import LeaderService from "../../services/LeaderService.js";
import scoreboardTemplate from './scoreboardTemplate.pug';

export default class ScoreboardView extends BaseView {
    constructor(el) {
        super(el);
        this.users = null;
        this.pagesCount = 0;
        this.pageIndex = 0;
        this.onPage = 5;

        bus.on('users-loaded', (data) => {
            this.users = data.users;
            this.pagesCount = Math.ceil(data.count / this.onPage);
            this.renderScoreboard(this.section);
        });

        bus.on('fetch-users', async () => {
            console.log(`fetching users: limit=${this.onPage}`, " offset=", this.pageIndex);
            const data = await LeaderService.FetchData(this.onPage, this.pageIndex * this.onPage);
            bus.emit("users-loaded", data);
        });
    }

    render() {
        this.el.innerHTML = '';

        if (!this.users) {
            console.log("view go to get users");
            this.getUsers();
        } else {
            this.renderScoreboard();
        }
    }

    renderScoreboard() {
        const scoreboardHtml = scoreboardTemplate({
            pageIndex: this.pageIndex,
            pagesCount: this.pagesCount,
            inputPlayers: this.users
        });

        this.el.innerHTML = scoreboardHtml;

        const paginationButtons = document.getElementById("pagination").querySelectorAll("button");

        console.log(paginationButtons);

        for (let i = 1; i <= this.pagesCount; i++) {
            paginationButtons[i].addEventListener("click", (event) => {
                event.preventDefault();
                this.pageIndex = paginationButtons[i].name;
                bus.emit('fetch-users');
            });
        }

        paginationButtons[0].addEventListener("click", (event) => {
            event.preventDefault();
            if (this.pageIndex > 0) {
                this.pageIndex--;
                bus.emit('fetch-users');
            }
        });
        console.log("count ", this.pagesCount);

        paginationButtons[(this.pagesCount + 1) | 0].addEventListener("click", (event) => {
            event.preventDefault();
            if (this.pageIndex + 1 < this.pagesCount) {
                this.pageIndex++;
                bus.emit('fetch-users');
            }
        });

    }

    getUsers() {
        console.log("Try get users from getUsers from View!");
        bus.emit("fetch-users");
    }

}