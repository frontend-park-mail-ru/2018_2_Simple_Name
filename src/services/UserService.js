const httpRequest = window.httpModule;
import bus from '../js/modules/EventBus.js';


// function delay (obj) {
//     return new Promise(function (resolve) {
//         setTimeout(function () {
//             resolve(obj);
//         }, 1000);
//     });
// }

export default class UsersService {
    // static FetchUsers () {
    //     return httpRequest
    //         .doGet({
    //             url: '/leaderscount'
    //         })
    //         .then(function (data) {
    //             return JSON.parse(data.responseText);
    //         });
    // };
    static async FetchData () {

        console.log("UserService fetchcount");



        const res1 = this.fetchPagesCount();

        //const res2 = await this.fetchUsers();

        //const users = await res1.json();
        const count = res1;

        //console.log(users);
        console.log(count);

        var data = {
            //users: users,
            count: count.leaderscount
        };

        bus.emit("users-loaded", data);

            // .then(function (data) {
            //     return JSON.parse(data.responseText);
            // });
    }


    static async fetchPagesCount() {
        const response = await httpRequest.doGet({ url: "http://127.0.0.1:8080/leaderscount" });
        const json = await response.json();
        return json

    }
    static fetchUsers() {
        return httpRequest.doGet({ url: "http://127.0.0.1:8080/leaders" });
    }

};
