import httpRequest from '../js/modules/httpModule.js';
import bus from '../js/modules/EventBus.js';
import * as config from './config.js';


export default class SignInService {

    static async FetchData(data) {

        const responseCode = await this.fetchData(data);
        return responseCode;
    }

    static async fetchData(data) {
        const res = await httpRequest.doPost({
            url: "/signin",
            data,
            contentType: 'application/json'
        });

        return res.status;
    }


}
