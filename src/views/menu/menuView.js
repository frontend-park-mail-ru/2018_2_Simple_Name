import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import MenuService from "../../services/MenuService.js";

export default class MenuView extends BaseView {
    constructor (el) {
        super(el);
        this.auth = false;
        bus.on('is-logged-fetch', async function () {
            const auth = await MenuService.FetchAuth();
            this.renderMenu(auth)
        }.bind(this))
    }

    renderMenu(islogged){
        this.el.innerHTML = '';
        const menuSection = document.createElement('section');
        menuSection.dataset.sectionName = 'menu';
        const menuHtml = window.menutemplateTemplate({
            auth: islogged
        });

        this.el.innerHTML = menuHtml;
    }

    render () {
        bus.emit("is-logged-fetch");
    }

}
