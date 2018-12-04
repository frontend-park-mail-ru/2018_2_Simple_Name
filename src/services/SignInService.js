const httpRequest = window.httpModule;
import bus from '../js/modules/EventBus.js';


export default class SignInService {

    static async FetchData (data) {

        console.log("SignInService fetch");

        await this.fetchData(data);
    }

    static fetchData(data) {
        httpRequest.doPost({
            url: "http://127.0.0.1:8080/signin",
            data: data,
            contentType: 'application/json'
        }).then(function (res) {
            if (res.status === 200) {
                alert("Успешно авторизаван")
            } else if (res.status === 400) {
                alert("Неверный логин/пароль");
            }
        });

        // Проверка статуса ответа
    }


};
