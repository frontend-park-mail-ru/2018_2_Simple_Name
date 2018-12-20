import httpRequest from '../js/modules/httpModule.js';

export default class LeadersService {
    static async FetchData(limit, offset) {
        const res1 = await this.fetchPagesCount();

        if (res1 === false) {
            return {
                'valid': false
            };
        }

        const count = res1;

        const res2 = await this.fetchUsers(limit, offset);

        if (res2 === false) {
            return {
                'valid': false
            };
        }

        const users = res2;

        const data = {
            'valid': true,
            'users': users,
            'count': count.leaderscount
        };

        return data;
    }


    static async fetchPagesCount() {
        const response = await httpRequest.doGet({ url: '/leaderscount' });
        let res = {};
        console.log('response.ok: ', response.ok);
        if (response.ok) {
            res = await response.json();
            return res;
        }

        return false;
    }

    static async fetchUsers(limit, offset) {
        const response = await httpRequest.doGet({ url: `/leaders?limit=${limit}&offset=${offset}` });
        let res;
        console.log('response.ok: ', response.ok);
        if (response.ok) {
            res = await response.json();
            return res;
        }

        return false;
    }
}
