const httpRequest = window.httpModule;

import bus from '../js/modules/EventBus.js';
import * as config from './config.js';



export default class SignInService {

    static async FetchData (data) {

        console.log("SignInService fetch");

        await this.fetchData(data);
    }

    static async fetchData(data) {
        const res = await httpRequest.doPost({
            url: config.url + "/signin",
            data: data,
            contentType: 'application/json'
        });

        if (res.status === 200) {
            alert("Успешно авторизаван")
        } else if (res.status === 400) {
            alert("Неверный логин/пароль");
        }
        window.RouterModule.open('/');
    }


};
