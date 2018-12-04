const httpRequest = window.httpModule;
import bus from '../js/modules/EventBus.js';


// function delay (obj) {
//     return new Promise(function (resolve) {
//         setTimeout(function () {
//             resolve(obj);
//         }, 1000);
//     });
// }

export default class LeadersService {
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



        const res1 = await this.fetchPagesCount();

        const res2 = await this.fetchUsers();

        const count = res1;
        const users = res2;

        console.log(users);
        console.log(count.leaderscount);

        const data = {
            "users": users,
            "count": count.leaderscount
        };

        //bus.emit("users-loaded", data);
        return data
            // .then(function (data) {
            //     return JSON.parse(data.responseText);
            // });
    }


    static async fetchPagesCount() {
        const response = await httpRequest.doGet({ url: "http://127.0.0.1:8080/leaderscount" });
        return await response.json()
    }

    static async fetchUsers() {
        const response = await httpRequest.doGet({ url: "http://127.0.0.1:8080/leaders" });
        return await response.json()
    }

};
