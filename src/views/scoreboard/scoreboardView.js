import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import LeaderService from "../../services/LeaderService.js";
import scoreboardTemplate from './scoreboardTemplate.pug';

export default class ScoreboardView extends BaseView {
    constructor(el, router, option) {
        console.log("Constructor ScoreboardView START: option= ", option);
        super(el);
        this.users = null;
        this.pagesCount = 0;
        console.log("OPTION: ", option);
        this.pageIndex = option || 0;
        console.log("PAGE: ", this.pageIndex);
        this.onPage = 5;
        this.RouterModule = router;

        bus.on(`users-loaded-${this.pageIndex}`, (data) => {
            console.log("Emit bus: ", `users-loaded-${this.pageIndex}`);

            this.users = data.users;
            this.pagesCount = Math.ceil(data.count / this.onPage);
            this.renderScoreboard();
        });

        bus.on(`fetch-users-${this.pageIndex}`, async () => {
            console.log("Emit bus: ", `fetch-users-${this.pageIndex}`);

            console.log(`fetching users: limit=${this.onPage}`, " offset=", this.pageIndex);
            const data = await LeaderService.FetchData(this.onPage, this.pageIndex * this.onPage);
            await bus.emit(`users-loaded-${this.pageIndex}`, data);
        });
    }

    render() {
        console.log("RENDER START");
        this.el.innerHTML = '';
        // const menuSection = document.createElement('section');
        // menuSection.dataset.sectionName = 'leaders';
        //
        // this.section = menuSection;
        // console.log("Option: ", option);

        // if (option){
        //     this.pageIndex = option;
        //     this.users = null;
        // }

        console.log("USers:", this.users);
        console.log("Page index (option): ", this.pageIndex);

        if (!this.users) {
            console.log("view go to get users");
            this.getUsers();
        } else {
            this.renderScoreboard();
        }
    }

    renderScoreboard() {
        console.log("RENDERSCOREBOARD START");

        const realPage = parseInt(this.pageIndex) + 1;
        console.log("pageIndex = ", this.pageIndex);
        console.log("real page = ", realPage);
        const scoreboardHtml = scoreboardTemplate({
            pagesCount: this.pagesCount,
            pageIndex: realPage,
            inputPlayers: this.users,
            active: this.pageIndex
        });

        this.el.innerHTML = scoreboardHtml;

        // const paginationButtons = document.getElementById("pagination").querySelectorAll(".button-ref");

        // console.log("buttons: ", paginationButtons);
        // console.log(paginationButtons[0]);
        // console.log(paginationButtons[1]);
        // console.log("count: ", this.pagesCount);
        // console.log(paginationButtons[2]);

        // for (let i = 0; i < this.pagesCount; i++) {

        // this.RouterModule.register('/leaders/'+paginationButtons[i].name, this, paginationButtons[i].name);

        // paginationButtons[i].addEventListener("click", function (event) {
        //     event.preventDefault();
        //     this.pageIndex = paginationButtons[i].name;
        //     // bus.emit('fetch-users');
        // }.bind(this))
        // }

        // paginationButtons[0].addEventListener("click", function (event) {
        //     event.preventDefault();
        //     if (this.pageIndex > 0) {
        //         this.pageIndex--;
        //         // bus.emit('fetch-users');
        //     }
        // }.bind(this));
        // console.log("count ", this.pagesCount);
        // console.log(paginationButtons[this.pagesCount]);

        // paginationButtons[(this.pagesCount+1) | 0].addEventListener("click", function (event) {
        //     event.preventDefault();
        //     if (this.pageIndex + 1 < this.pagesCount) {
        //         this.pageIndex++;
        //         // console.log("index ", this.pageIndex);
        //         // bus.emit('fetch-users');
        //     }
        // }.bind(this));

    }

    getUsers() {
        console.log("Bus EMIT: ", `fetch-users-${this.pageIndex}`);
        bus.emit(`fetch-users-${this.pageIndex}`);
    }

}