import httpRequest from '../js/modules/httpModule.js';
import bus from '../js/modules/EventBus.js';
// import * as config from './config.js';


export default class ProfileService {

    static async GetUserData() {

        console.log("GetUserData fetch");

        const data = await this.fetchGetData();

        const jsonData = await data.json();

        return jsonData;
    }

    static async SendUserAvatar(data) {

        console.log("SendUserAvatar fetch");

        await this.fetchSetAvatar(data);

        // Обработка ответа тут?
    }

    static async PutUserData(data) {

        console.log("PutUserData fetch");

        await this.fetchSendData(data);

    }

    static async Logout() {

        console.log("Logout fetch");

        await this.fetchLogout();

    }

    static async fetchGetData() {
        const resp = await httpRequest.doGet({
            url: "/profile"
        });

        if (resp.status === 200) {
            return resp;
        }

    }

    static async fetchSendData(data) {
        const resp = await httpRequest.doPut({
            url: "/profile",
            data,
            contentType: 'application/json'
        });

        if (resp.status === 200) {

            window.RouterModule.open("/");
        } else {
        }
    }

    static async fetchLogout() {
        await httpRequest.doGet({
            url: "/logout"
        });

        window.RouterModule.open("/");
    }

    static async fetchSetAvatar(avatarformData) {
        await fetch("http://127.0.0.1:8080/api/profile", {
            method: "POST",
            body: avatarformData,
            credentials: 'include'
        });

        window.RouterModule.open("/profile");
    }
}
