import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';

export default class ScoreboardView extends BaseView {
    constructor(el){
        super(el);
        this.users = null;
        this.pagesCount = 0;
        this.pageIndex = 0;

        bus.on('users-loaded', function (users, count) {
            this.users = users;
            this.pagesCount = count;
        }.bind(this));
    }

    fetchUsers () {
        bus.emit('fetch-users');
    }

    // setUsers (users) {
    //     this.users = users;
    //     this.render();
    // }

    render () {
        this.el.innerHTML = '';
        const menuSection = document.createElement('section');
        menuSection.dataset.sectionName = 'leaders';

        if (!this.users){
            this.getUsers();
        }

        const scoreboardHtml = window.scoreboardtemplateTemplate({
                        pageIndex: this.pageIndex,
                        pagesCount: this.pagesCount,
                        inputPlayers: this.users
                        //statusText
        });

    }

    getUsers(){
        console.log("Try get users from getUsers from View!");
        bus.emit("fetch-users");
       // console.log("Get users!");
       //  data.json.then((userData) => {
       //      console.log(userData)
       //  });
    }

    // renderPage () {
    // const a = await fetch()
    // }

}