const httpRequest = window.httpModule;
import bus from '../js/modules/EventBus.js';


export default class ProfileService {

    static async GetUserData () {

        console.log("GetUserData fetch");

        const data = await this.fetchGetData();

        const jsonData = await data.json();

        return jsonData;
    }

    static async SendUserAvatar (data) {

        console.log("SendUserAvatar fetch");

        await this.fetchSetAvatar(data);

        //Обработка ответа тут?
    }

    static async PutUserData (data) {

        console.log("PutUserData fetch");

        await this.fetchSendData(data);

    }
    static async Logout () {

        console.log("Logout fetch");

        await this.fetchLogout();

    }

    static async fetchGetData() {
        const resp = await httpRequest.doGet({
            url: "http://127.0.0.1:8080/profile",
        });

        if (resp.status === 200) {
            return resp
        } else {
            alert("Неизвестная ошибка")
        }
    }

    static async fetchSendData(data) {
        const resp = await httpRequest.doPut({
            url: "http://127.0.0.1:8080/profile",
            data: data,
            contentType: 'application/json',
        });

        if (resp.status === 200) {
            alert("Данные успешно изменены");
            window.RouterModule.open("/");
        } else {
            alert("Неизвестная ошибка")
        }
    }

    static async fetchLogout() {
        await httpRequest.doGet({
            url: "http://127.0.0.1:8080/logout"
        });

        window.RouterModule.open("/");
    }

    static async fetchSetAvatar(avatarformData) {
        await fetch("http://127.0.0.1:8080/profile", {
                    method: "POST",
                    body: avatarformData,
                    credentials: 'include',
        });

        window.RouterModule.open("/profile");
    }
};
