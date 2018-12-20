import httpRequest from '../js/modules/httpModule.js';
import bus from '../js/modules/EventBus.js';

export default class SignInService {

    static async FetchAuth() {
        const auth = await this.fetchAuth();

        return auth;
    }

    static async fetchAuth() {
        const resp = await httpRequest.doGet({
            url: '/islogged'
        });
        // Проверка статуса ответа
        // console.log(resp);
        if (resp.ok) {
            return resp.status === 200;
        } else {
            return false;
        }
    }


}
