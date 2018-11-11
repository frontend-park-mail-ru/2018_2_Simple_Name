(function () {
    class HttpRequest {
        dofetch({
            url, method, data, contentType, callback = function () { }
        } = {}) {
            fetch(url, {
                method,
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': contentType
                }
            })
                .then((res) => {
                    callback(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        doGet(params = {}) {
            this.dofetch({ ...params, method: 'GET', contentType: 'text/plain' });
        }

        doPost(params = {}) {
            this.dofetch({ ...params, method: 'POST' });
        }

        doPut(params = {}) {
            this.dofetch({ ...params, method: 'PUT' });
        }
    }
    window.httpModule = new HttpRequest();
}());
