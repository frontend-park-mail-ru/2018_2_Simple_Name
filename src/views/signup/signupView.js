import BaseView from "../baseView/baseView.js";
import SignUpService from "../../services/SignUpService.js";
import bus from '../../js/modules/EventBus.js';
import signupTemplate from './signupTemplate.pug';


export default class signupView extends BaseView {
    constructor(el, router) {
        super(el);

        this.RouterModule = router;

        bus.on("sign-up-fetch", async () => {
            const form = document.getElementById('signupForm');

            // todo: валидация данных здесь

            const usrNickname = form.elements.nickname.value;
            if (!usrNickname
                || usrNickname.match(/[#&<>\"~;$^%{}?]/)
                || !usrNickname.match(/\S{3,20}/)) {
                // const errText = 'Enter a valid nickname';
                // return createSignUp(errText);
                return;
            }

            const usrEmail = form.elements.email.value;
            if (!usrEmail
                || !usrEmail.match(/[@]\S{5,50}/)) {
                // const errText = 'Enter a valid Email';
                // return createSignUp(errText);
            }

            const usrPass = form.elements.password.value;
            const repeatPass = form.elements.repeatPassword.value;

            if (usrPass !== repeatPass) {
                return;
            }

            const JSONdata = {
                'nick': usrNickname,
                'email': usrEmail,
                'password': usrPass
            };

            await SignUpService.FetchData(JSONdata);

            this.RouterModule.open('/');
        });
    }

    render() {
        this.el.innerHTML = '';

        this.el.innerHTML = signupTemplate();

        const signupButton = document.getElementById("signupButton");

        signupButton.addEventListener('click', (event) => {
            event.preventDefault();
            bus.emit("sign-up-fetch");
        });
    }

}