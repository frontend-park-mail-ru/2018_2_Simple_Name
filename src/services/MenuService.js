const httpRequest = window.httpModule;
import bus from '../js/modules/EventBus.js';


export default class SignInService {

    static async FetchAuth () {

        console.log("Menu fetch");

        const auth = await this.fetchAuth();

        return auth;
    }

    static async fetchAuth() {
        const resp = await httpRequest.doGet({
            url: "http://127.0.0.1:8080/islogged",
        });

        return resp.status === 200;

        // Проверка статуса ответа
    }


};
