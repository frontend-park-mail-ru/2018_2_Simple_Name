import BaseView from '../baseView/baseView.js';
import SignUpService from '../../services/SignUpService.js';
import bus from '../../js/modules/EventBus.js';
import signupTemplate from './signupTemplate.pug';


export default class signupView extends BaseView {
    constructor(el, router) {
        super(el);

        this.RouterModule = router;

        bus.on('sign-up-fetch', async () => {

            const form = document.getElementById('signupForm');

            const usrNickname = form.elements.nickname.value;

            let errText = '';
            let nicknameError,
                emailError = false;

            if (!usrNickname
                || usrNickname.match(/[#&<>\"~;$^%{}?]/)
                || !usrNickname.match(/\S{3,20}/)) {
                errText += 'Введите корректный ник.';
                nicknameError = true;
            }

            const usrEmail = form.elements.email.value;
            if (!usrEmail
                || !usrEmail.match(/[@]\S{5,50}/)) {
                errText += 'Введите корректный email.';
                emailError = true;
            }

            const usrPass = form.elements.password.value;
            const repeatPass = form.elements.repeatPassword.value;

            if (usrPass !== repeatPass) {
                errText += 'Пароли не совпадают.';
            }

            if (errText !== '') {
                this.renderErrorForm(errText, nicknameError, emailError);
                return;
            }

            const JSONdata = {
                'nick': usrNickname,
                'email': usrEmail,
                'password': usrPass
            };

            const responseCode = await SignUpService.FetchData(JSONdata);

            if (responseCode === 201) {
                this.RouterModule.open('/', 'Успешно зарегистрирован!');
            } else if (responseCode === 400) {
                this.renderErrorForm('Пожалуйста, введите корректные данные.');
            } else {
                this.RouterModule.open('/', 'Что-то пошло не так!');
            }
        });
    }

    render(text) {
        this.el.innerHTML = '';

        this.el.innerHTML = signupTemplate({statusText: text});

        const signupButton = document.getElementById('signupButton');

        signupButton.addEventListener('click', (event) => {
            event.preventDefault();
            bus.emit('sign-up-fetch');
        });
    }

    renderErrorForm(text, nicknameError, emailError) {
        const errorText = document.getElementById('signUpErrorText');

        errorText.innerText = text;

        if (nicknameError) {
            document.getElementById('nickname').value = '';
        }
        if (emailError) {
            document.getElementById('email').value = '';
        }


    }

}