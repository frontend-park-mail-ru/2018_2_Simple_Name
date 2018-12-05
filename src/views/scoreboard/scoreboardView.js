import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import LeaderService from "../../services/LeaderService.js";

export default class ScoreboardView extends BaseView {
    constructor(el){
        super(el);
        this.users = null;
        this.pagesCount = 0;
        this.pageIndex = 0;
        this.onPage = 5;

        bus.on('users-loaded', function (data) {
            this.users = data.users;
            this.pagesCount = Math.ceil(data.count / this.onPage);
            this.renderScoreboard(this.section);
        }.bind(this));

        bus.on('fetch-users', async function() {
            console.log("fetching users: limit="+this.onPage, " offset=", this.pageIndex);
            const data = await LeaderService.FetchData(this.onPage, this.pageIndex * this.onPage);
            bus.emit("users-loaded", data);
        }.bind(this));
    }

    render () {
        this.el.innerHTML = '';
        // const menuSection = document.createElement('section');
        // menuSection.dataset.sectionName = 'leaders';
        //
        // this.section = menuSection;

        if (!this.users){
            console.log("view go to get users");
            this.getUsers();
        } else {
            this.renderScoreboard();
        }
    }

    renderScoreboard() {
        const scoreboardHtml = window.scoreboardtemplateTemplate({
            pageIndex: this.pageIndex,
            pagesCount: this.pagesCount,
            inputPlayers: this.users
            //statusText
        });

        this.el.innerHTML = scoreboardHtml;

        const paginationButtons = document.getElementById("pagination").querySelectorAll("button");

        console.log(paginationButtons);

        for (let i = 1; i <= this.pagesCount; i++) {
            paginationButtons[i].addEventListener("click", function (event) {
                event.preventDefault();
                this.pageIndex = paginationButtons[i].name;
                bus.emit('fetch-users');
            }.bind(this))
        }

        paginationButtons[0].addEventListener("click", function (event) {
            event.preventDefault();
            if (this.pageIndex > 0) {
                this.pageIndex--;
                bus.emit('fetch-users');
            }
        }.bind(this));
        console.log("count ", this.pagesCount);
        // console.log(paginationButtons[this.pagesCount]);

        paginationButtons[(this.pagesCount+1) | 0].addEventListener("click", function (event) {
            event.preventDefault();
            if (this.pageIndex + 1 < this.pagesCount) {
                this.pageIndex++;
                // console.log("index ", this.pageIndex);
                bus.emit('fetch-users');
            }
        }.bind(this));

    }

    getUsers(){
        console.log("Try get users from getUsers from View!");
        bus.emit("fetch-users");
       // console.log("Get users!");
       //  data.json.then((userData) => {
       //      console.log(userData)
       //  });
    }

    // show(){
    //     console.log("show");
    //     this.render();
    // }

    // renderPage () {
    // const a = await fetch()
    // }

}