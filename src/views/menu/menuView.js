import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import MenuService from "../../services/MenuService.js";
import menuTemplate from './menuTemplate.pug';


export default class MenuView extends BaseView {
    constructor(el) {
        super(el);
        this.auth = false;
        bus.on('is-logged-fetch', async (text) => {
            const auth = await MenuService.FetchAuth();
            this.renderMenu(auth, text);
        });
    }

    renderMenu(auth, text) {
        this.el.innerHTML = '';
        const menuSection = document.createElement('section');
        menuSection.dataset.sectionName = 'menu';

        let menuHtml = menuTemplate({auth, statusText: text});

        this.el.innerHTML = menuHtml;
    }

    render(text) {
        bus.emit("is-logged-fetch", text);
    }

}
