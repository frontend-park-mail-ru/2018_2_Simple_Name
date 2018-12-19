import httpRequest from '../js/modules/httpModule.js';

export default class LeadersService {
    static async FetchData(limit, offset) {
        const res1 = await this.fetchPagesCount();

        const res2 = await this.fetchUsers(limit, offset);

        const count = res1;
        const users = res2;

        const data = {
            'users': users,
            'count': count.leaderscount
        };

        return data;
    }


    static async fetchPagesCount() {
        const response = await httpRequest.doGet({ url: '/leaderscount' });
        const res = await response.json();
        return res;
    }

    static async fetchUsers(limit, offset) {
        const response = await httpRequest.doGet({ url: `/leaders?limit=${limit}&offset=${offset}` });
        const res = await response.json();
        return res;
    }
}
