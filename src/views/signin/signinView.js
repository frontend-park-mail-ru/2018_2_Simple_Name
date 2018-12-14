import BaseView from "../baseView/baseView.js";
import SignInService from "../../services/SignInService.js";
import bus from '../../js/modules/EventBus.js';
import signinTemplate from './signinTemplate.pug';


export default class signinView extends BaseView {
    constructor(el, router) {
        super(el);
        this.RouterModule = router;
        bus.on("sign-in-fetch", async () => {
            const form = document.getElementById('signinForm');

            const email = form.elements.email.value;
            const password = form.elements.password.value;

            const JSONdata = {
                email,
                password
            };

            await SignInService.FetchData(JSONdata);

            this.RouterModule.open('/');

        });
    }

    render() {
        this.el.innerHTML = '';
        this.el.innerHTML = signinTemplate();

        const signinButton = document.getElementById("signinButton");

        signinButton.addEventListener('click', (event) => {
            event.preventDefault();
            bus.emit("sign-in-fetch");
        });
    }

}