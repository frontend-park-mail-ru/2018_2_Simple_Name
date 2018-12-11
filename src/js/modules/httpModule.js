// (function () {
    class HttpRequest {
        dofetch({
            url, method, data, contentType, callback = function () { }
        } = {}) {
            return fetch(url, {
                method,
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': contentType
                }
            })
                // .then((res) => {
                //     callback(res);
                // })
                // .catch((err) => {
                //     console.log(err);
                // });
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

    // const HttpRequest = new HttpRequest();
    // window.httpModule = new HttpRequest();
    // export default HttpRequest;
    export default new HttpRequest();
// }());
