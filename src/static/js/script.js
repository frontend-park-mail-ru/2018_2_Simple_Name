'use strict';

const httpRequest = window.httpModule;

const root = document.getElementById("root");

function createMenu() {
    const menuHtml = window.menuTemplate();
    root.innerHTML = menuHtml;
}

function createSignIn() {

    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/islogged',

        callback(res) {
            if (res.status == 200) {
                alert("You already authorized")
                createMenu()
            } else {
                return;
            }
        },
    });

    const signinHtml = window.signinTemplate();
    root.innerHTML = signinHtml;

    const form = document.getElementById('signinForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        const JSONdata = {
            "email": email,
            "password": password
        };

        httpRequest.doPost({
            url: 'http://127.0.0.1:8080/signin',
            contentType: 'application/json',
            data: JSONdata,

            callback(res) {
                if (res.status == 400) {
                    alert("Wrong login or password");
                    return;
                }
                if (res.status == 500) {
                    alert("¯\_(ツ)_/¯")
                }
                if (res.status == 200) {
                    alert("You are log in!")
                    createProfile();
                }
            },
        });
    })
}

function createSignUp() {

    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/islogged',

        callback(res) {
            if (res.status == 200) {
                alert("You are already authorized")
                createMenu()
            } else { return; }
        },
    });

    const signupHtml = window.signupTemplate();
    root.innerHTML = signupHtml;

    const form = document.getElementById('signupForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const firstname = form.elements['firstname'].value;
        const lastname = form.elements['lastname'].value;
        const nickname = form.elements['nickname'].value;
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const repeatPassword = form.elements['repeatPassword'].value;


        if (password !== repeatPassword) {
            alert('Passwords is not equals');
            return;
        } else if (email == "") {
            alert("Enter email!")
            return
        }

        const JSONdata = {
            "name": firstname,
            "last_name": lastname,
            "nick": nickname,
            "email": email,
            "password": password
        };

        httpRequest.doPost({
            url: 'http://127.0.0.1:8080/signup',
            data: JSONdata,
            contentType: 'application/json',

            callback(res) {
                console.log(res.status);
                if (res.status > 300) {
                    alert("You already register");
                    createMenu();
                    return;
                } else if (res.status == 208) {
                    alert("Email already exist");
                    return;
                } else if (res.status == 400) {
                    alert("Something is wrong");
                    return;
                } else if (res.status == 409) {
                    alert("StatusConflict");
                    return;
                }
                else {
                    createProfile();
                }
            },
        });
    });
}

function createScoreboard() {

    let pagesCount, inputPlayers;
    // Заправшиваем кол-во страниц с игроками
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/askForPlayersCount',
        callback(res) {
            if (res.status > 300) {
                alert('Something wrong');
                createMenu();
                return;
            }
            res.then(function (data) {
                pagesCount = data;
            });
        },
    });
    //Заправшиваем игроков
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/askForPlayers',
        callback(res) {
            if (res.status > 300) {
                alert('Something wrong');
                createMenu();
                return;
            }
            res.json().then(function (data) {
                inputPlayers = data;
            });
        },
    });

    // Индекс актвиной страницы при первом открытии старницы слидерами
    const index = 1;

    const scoreboardHtml = window.scoreboardTemplate({ index, pagesCount, inputPlayers });
    root.innerHTML = scoreboardHtml;

    const pagination = document.getElementById("pagination");

    pagination.addEventListener("click", function (event) {
        if (!(event.target instanceof HTMLAnchorElement)) return;

        event.preventDefault();

        const target = event.target;
        const pageName = target.name;
        //Приводим к числу имя страницы
        // const intPageName = parseInt(pageName, 10);

        //Отправляем индекс страницы на бэк и получаем новых лидеров
        httpRequest.doGet({
            url: 'http://127.0.0.1:8080/...',
            data: pageName,

            callback(res) {
                if (res.status > 300) {
                    console.log('Something wrong');
                    createMenu();
                    return;
                }
                //Отрисовываем новых лидеров
                res.json().then(function (playersData) {
                    const scoreboardHtml = window.scoreboardTemplate({ pageName, pagesCount, playersData });
                    root.innerHTML = scoreboardHtml;
                });
            },
        });
    });
}

function createProfile(me) {
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/islogged',

        callback(res) {
            if (res.status == 400) {
                alert("Please login");
                createSignIn();
            }
        },
    });

    const profileHtml = window.profileTemplate();
    root.innerHTML = profileHtml;

    const form = document.getElementById('profileForm');

    if (me) {
        form.addEventListener('submit', function (event) {

            event.preventDefault();

            // let formData = new FormData(document.forms.profileForm);
            //file is actually new FileReader.readAsData(myId.files[0]);
            //  formData.append("my_file", avatar);

            // const password = form.elements['password'].value;
            // const repeatPassword = form.elements['repeatPassword'].value;

            // jsonProfileData = {
            //     password: password,
            //     repeatPassword: repeatPassword
            // }

            httpRequest.doPost({ // Отправка аватарки
                callback(res) {
                    if (res.status > 300) {
                        alert("Something was wrong");
                        return;
                    }
                    createProfile();
                },
                url: '/profile',
                data: formData,
                contentType: '',
            });

        });
    } else {
        httpRequest.doGet({
            url: '/profile',

            callback(res) {
                console.log(res.status);
                if (res.status > 300) {
                    alert('Unauthorized');
                    createMenu();
                    return;
                }
                //let response = res.json();
                //const user = JSON.parse(res.responseText);

                res.json().then(function (user) {
                    createProfile(user);
                });
            },
        })
    }
}

function createAbout() {
    const aboutHtml = window.aboutTemplate();
    root.innerHTML = aboutHtml;
}

const menuButtons = {
    'signin': createSignIn,
    'signup': createSignUp,
    'leaders': createScoreboard,
    'profile': createProfile,
    'about': createAbout,
    'menu': createMenu,
};

root.addEventListener("click", function (event) {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    event.preventDefault();

    const target = event.target;
    const eventName = target.name;
    menuButtons[eventName]();
});

createMenu();