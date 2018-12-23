class HttpRequest {
    dofetch({
        url, method, data, contentType, callback = function () { }
    } = {}) {
        return fetch(`https://simplegame.ru.com/api${url}`, {
            method,
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': contentType
            }
        }).catch((error) => {
            return error;
        });
    }

    doGet(params = {}) {
        return this.dofetch({ ...params, method: 'GET', contentType: 'text/plain' });
    }

    doPost(params = {}) {
        return this.dofetch({ ...params, method: 'POST' });
    }

    doPut(params = {}) {
        return this.dofetch({ ...params, method: 'PUT' });
    }
}
export default new HttpRequest();
