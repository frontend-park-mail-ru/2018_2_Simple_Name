import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';

export default class ScoreboardView extends BaseView {
    constructor(el){
        super(el);
        this.users = null;
        this.pagesCount = 0;
        this.pageIndex = 0;

        bus.on('users-loaded', function (data) {
            const onPage = 5;
            this.users = data.users;
            this.pagesCount = data.count / onPage;
            this.renderScoreboard(this.section);
        }.bind(this));
    }

    render () {
        this.el.innerHTML = '';
        const menuSection = document.createElement('section');
        menuSection.dataset.sectionName = 'leaders';

        this.section = menuSection;

        if (!this.users){
            console.log("view go to get users");
            this.getUsers();
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