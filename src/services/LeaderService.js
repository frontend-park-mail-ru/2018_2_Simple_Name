const httpRequest = window.httpModule;
// import bus from '../js/modules/EventBus.js';
import * as config from './config.js';


// function delay (obj) {
//     return new Promise(function (resolve) {
//         setTimeout(function () {
//             resolve(obj);
//         }, 1000);
//     });
// }

export default class LeadersService {
    static async FetchData (limit, offset) {


        console.log("UserService fetchcount");
        console.log(limit);
        console.log(offset);



        const res1 = await this.fetchPagesCount();

        const res2 = await this.fetchUsers(limit, offset);

        const count = res1;
        const users = res2;

        console.log(users);
        console.log(count.leaderscount);

        const data = {
            "users": users,
            "count": count.leaderscount
        };

        return data
    }


    static async fetchPagesCount() {
        const response = await httpRequest.doGet({ url: config.url + "/leaderscount" });
        return await response.json()
    }

    static async fetchUsers(limit, offset) {
        const response = await httpRequest.doGet({ url: config.url + "/leaders?limit="+limit+"&offset="+offset });
        return await response.json()
    }
};
