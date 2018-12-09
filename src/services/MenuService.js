// const httpRequest = window.httpModule;
// const httpRequest = new httpRequest();
import httpRequest from '../js/modules/httpModule.js';
import bus from '../js/modules/EventBus.js';
import * as config from './config.js';


export default class SignInService {

    static async FetchAuth () {

        console.log("Menu fetch");

        const auth = await this.fetchAuth();

        return auth;
    }

    static async fetchAuth() {
        const resp = await httpRequest.doGet({
            url: config.url + "/islogged",
        });

        return resp.status === 200;

        // Проверка статуса ответа
    }


};
