import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';
import MenuService from "../../services/MenuService.js";
import menuTemplate from './menuTemplate.pug';


export default class MenuView extends BaseView {
    constructor(el) {
        super(el);
        this.auth = false;
        bus.on('is-logged-fetch', async () => {
            const auth = await MenuService.FetchAuth();
            this.renderMenu(auth);
        });
    }

    renderMenu(islogged) {
        this.el.innerHTML = '';
        const menuSection = document.createElement('section');
        menuSection.dataset.sectionName = 'menu';
        // const menuHtml = window.menutemplateTemplate({
        //     auth: islogged
        // });

        let menuHtml = menuTemplate({auth: islogged});

        this.el.innerHTML = menuHtml;
    }

    render() {
        bus.emit("is-logged-fetch");
    }

}
