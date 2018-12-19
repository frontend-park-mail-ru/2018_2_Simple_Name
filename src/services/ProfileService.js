import httpRequest from '../js/modules/httpModule.js';
import bus from '../js/modules/EventBus.js';

export default class ProfileService {

    static async GetUserData() {

        const data = await this.fetchGetData();

        const jsonData = await data.json();

        return jsonData;
    }

    static async SendUserAvatar(data) {
        await this.fetchSetAvatar(data);
    }

    static async PutUserData(data) {
        await this.fetchSendData(data);

    }

    static async Logout() {
        await this.fetchLogout();

    }

    static async fetchGetData() {
        const resp = await httpRequest.doGet({
            url: '/profile'
        });

        if (resp.status === 200) {
            return resp;
        }

    }

    static async fetchSendData(data) {
        const resp = await httpRequest.doPut({
            url: '/profile',
            data,
            contentType: 'application/json'
        });
    }

    static async fetchLogout() {
        await httpRequest.doGet({
            url: '/logout'
        });
    }

    static async fetchSetAvatar(avatarformData) {
        await fetch('http://127.0.0.1:8080/api/profile', {
            method: 'POST',
            body: avatarformData,
            credentials: 'include'
        });
    }
}
