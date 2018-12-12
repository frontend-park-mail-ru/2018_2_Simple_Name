import httpRequest from '../js/modules/httpModule.js';
import bus from '../js/modules/EventBus.js';
// import * as config from './config.js';


export default class SignInService {

    static async FetchAuth() {
        const auth = await this.fetchAuth();

        return auth;
    }

    static async fetchAuth() {
        const resp = await httpRequest.doGet({
            url: "/islogged"
        });
        // Проверка статуса ответа
        return resp.status === 200;
    }


}
