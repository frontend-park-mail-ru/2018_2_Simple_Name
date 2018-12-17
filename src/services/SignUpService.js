import httpRequest from '../js/modules/httpModule.js';
import * as config from './config.js';

export default class SignUpService {

    static async FetchData(data) {
        const responseCode = await this.fetchData(data);

        return responseCode;
    }

    static async fetchData(data) {
        const res = await httpRequest.doPost({
            url: "/signup",
            data,
            contentType: 'application/json'
        });
        return res.status;
    }


}
