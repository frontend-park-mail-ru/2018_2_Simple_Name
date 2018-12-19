class HttpRequest {
    dofetch({
        url, method, data, contentType, callback = function () { }
    } = {}) {
        return fetch(`http://127.0.0.1:8080/api${url}`, {
            method,
            mode: 'no-cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': contentType
            }
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
