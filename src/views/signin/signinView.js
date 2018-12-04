import BaseView from "../baseView/baseView.js";
import SignInService from "../../services/SignInService.js";
import bus from '../../js/modules/EventBus.js';

export default class signinView extends BaseView {
    constructor(el){
        super(el);
        bus.on("sign-in-fetch", function () {
            const form = document.getElementById('signinForm');

            const email = form.elements.email.value;
            const password = form.elements.password.value;

            const JSONdata = {
                email,
                password
            };

            SignInService.FetchData(JSONdata)
        })
    }

    render () {
        this.el.innerHTML = '';
        const signinSection = document.createElement('section');
        signinSection.dataset.sectionName = 'signin';

        this.section = signinSection;

        const signinHtml = window.signintemplateTemplate() ;

        // this.section.innerHTML = signinHtml
        this.el.innerHTML = signinHtml;

        const signinButton = document.getElementById("signinButton");

        signinButton.addEventListener('click', function (event) {
            event.preventDefault();
            bus.emit("sign-in-fetch")
        });
    }

}