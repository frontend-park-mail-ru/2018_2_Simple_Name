(function () {

    class httpRequest {
        _dofetch({ url = '/', method, data, contentType, callback = function () { } } = {}) {
            fetch(url, {
                method: method,
                mode: 'cors',
                credentials: 'include',
                body: data,
                headers: {
                    'Content-Type': contentType,
                },
            })
                .then(function (res) {
                    callback(res);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        doGet(params = {}) {
            this._dofetch({ ...params, method: 'GET'});
        }

        doPost(params = {}) {
            this._dofetch({ ...params, method: 'POST'});
        }
    }
    window.httpModule = new httpReq();
})();