import BaseView from "../baseView/baseView.js";
import SignUpService from "../../services/SignUpService.js";
import bus from '../../js/modules/EventBus.js';

export default class signupView extends BaseView {
    constructor(el){
        super(el);
        bus.on("sign-up-fetch", function () {
            const form = document.getElementById('signupForm');

            const usrNickname = form.elements.nickname.value;
            // if (!usrNickname
            //     || usrNickname.match(/[#&<>\"~;$^%{}?]/)
            //     || !usrNickname.match(/\S{3,20}/)) {
            //     // const errText = 'Enter a valid nickname';
            //     // return createSignUp(errText);
            //     return
            // }

            const usrEmail = form.elements.email.value;
            // if (!usrEmail
            //     || !usrEmail.match(/[@]\S{5,50}/)) {
            //     // const errText = 'Enter a valid Email';
            //     // return createSignUp(errText);
            // }

            const usrPass = form.elements.password.value;
            const repeatPass = form.elements.repeatPassword.value;

            if (usrPass !== repeatPass){
                alert("pass != repeat");
                return
            }

            const JSONdata = {
                'nick': usrNickname,
                'email': usrEmail,
                'password': usrPass
            };

            SignUpService.FetchData(JSONdata)
        })
    }

    render () {
        this.el.innerHTML = '';
        const signupSection = document.createElement('section');
        signupSection.dataset.sectionName = 'signup';

        this.section = signupSection;

        const signupHtml = window.signuptemplateTemplate() ;

        this.el.innerHTML = signupHtml;

        const signupButton = document.getElementById("signupButton");

        signupButton.addEventListener('click', function (event) {
            event.preventDefault();
            bus.emit("sign-up-fetch")
        });
    }

}