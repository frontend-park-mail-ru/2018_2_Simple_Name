import httpRequest from '../js/modules/httpModule.js';
import * as config from './config.js';

export default class SignUpService {

    static async FetchData(data) {

        console.log("SignInService fetch");

        await this.fetchData(data);
    }

    static async fetchData(data) {
        const res = await httpRequest.doPost({
            url: "/signup",
            data,
            contentType: 'application/json'
        });
        if (res.status === 201) {
            // alert("Успешно зарегистрирован");
        } else {
            // alert("Что-то пошло не так");
        }
        window.RouterModule.open('/');
    }


}
