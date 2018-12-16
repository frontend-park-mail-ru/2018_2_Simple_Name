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

            const responseCode = await SignInService.FetchData(JSONdata);

            console.log("Status CODE = ", responseCode);

            if (responseCode === 200) {
                this.RouterModule.open("/", "Успешно авторизован!");
            } else if (responseCode === 400) {
                this.render("Не верный логин или пароль.");
            } else {
                this.RouterModule.open("/", "Что-то пошло не так!");
            }
        });
    }

    render(text) {
        console.log("Render signIN!");

        this.el.innerHTML = '';
        this.el.innerHTML = signinTemplate({statusText: text});

        const signinButton = document.getElementById("signinButton");

        signinButton.addEventListener('click', (event) => {
            event.preventDefault();
            bus.emit("sign-in-fetch");
        });
    }

}