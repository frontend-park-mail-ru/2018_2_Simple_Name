const httpRequest = window.httpModule;


export default class SignUpService {

    static async FetchData (data) {

        console.log("SignInService fetch");

        await this.fetchData(data);
    }
    static async fetchData(data) {
        const res = await httpRequest.doPost({
            url: "http://127.0.0.1:8080/signup",
            data: data,
            contentType: 'application/json'
        });
        if (res.status === 201) {
            alert("Успешно зарегистрирован")
        } else {
            alert("Что-то пошло не так");
        }
        window.RouterModule.open('/');
    }


};
