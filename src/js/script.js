const httpRequest = window.httpModule;

const root = document.getElementById('root');

function createMenu() {
    const menuHtml = window.menutemplateTemplate();
    root.innerHTML = menuHtml;
}

// function createAbout() {
//   window.About = new About();
//   const aboutView = window.About; // эквивалентно const aboutView = window.aboutView;
//   function showView(aboutView, data) {
//    if (data) {
//     aboutView.data = data;
//    }

//    currentView.hide();
//    aboutView.show();
//    currentView = aboutView;
//   }

//   showView(AboutView, { })
// }

function createSignIn() {
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/islogged',

        callback(res) {
            if (res.status === 200) {
                // alert('You already authorized');
                const errText = 'You already authorized';
                root.innerHTML = window.profiletemplateTemplate({ errText });
            }
        }
    });

    const signinHtml = window.signintemplateTemplate();
    root.innerHTML = signinHtml;

    const form = document.getElementById('signinForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = form.elements.email.value;
        const password = form.elements.password.value;

        const JSONdata = {
            email,
            password
        };

        httpRequest.doPost({
            url: 'http://127.0.0.1:8080/signin',
            contentType: 'application/json',
            data: JSONdata,

            callback(res) {
                if (res.status === 400) {
                    // alert('Wrong login or password');
                    const errText = 'Wrong login or password';
                    root.innerHTML = window.signintemplateTemplate({ errText });
                    return;
                }
                if (res.status === 500) {
                    // alert('Server error');
                    const errText = 'Server error';
                    root.innerHTML = window.signintemplateTemplate({ errText });
                    return;
                }
                if (res.status === 200) {
                    // alert('You are already logged in!');
                    const errText = 'You are already logged in!';
                    root.innerHTML = window.profiletemplateTemplate({ errText });

                    // createProfile();
                }
            }
        });
    });
}

function createSignUp() {
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/islogged',
        callback(res) {
            if (res.status === 200) {
                // alert('You are already authorized');
                const errText = 'You are already authorized';
                root.innerHTML = window.profiletemplateTemplate({ errText });
            }
        }
    });

    const signupHtml = window.signuptemplateTemplate();
    root.innerHTML = signupHtml;

    const form = document.getElementById('signupForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstname = form.elements.firstname.value;
        const lastname = form.elements.lastname.value;
        const age = form.elements.age.value;
        const nickname = form.elements.nickname.value;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        const repeatPassword = form.elements.repeatPassword.value;

        if (password !== repeatPassword) {
            // alert('Passwords is not equals');
            const errText = 'Passwords is not equals';
            root.innerHTML = window.signuptemplateTemplate({ errText });
            return;
        } if (email === '') {
            // alert('Enter email!');
            root.innerHTML = window.signuptemplateTemplate({ errText });
            return;
        }

        const JSONdata = {
            name: firstname,
            last_name: lastname,
            age,
            nick: nickname,
            email,
            password
        };

        httpRequest.doPost({
            url: 'http://127.0.0.1:8080/signup',
            data: JSONdata,
            contentType: 'application/json',

            callback(res) {
                console.log(res.status);
                if (res.status > 300) {
                    // alert('You already register');
                    const errText = 'You already register';
                    root.innerHTML = window.menutemplateTemplate({ errText });
                    createMenu();
                } else if (res.status === 208) {
                    // alert('Email already exist');
                    const errText = 'Email already exist';
                    root.innerHTML = window.signuptemplateTemplate({ errText });
                } else if (res.status === 400) {
                    // alert('Something is wrong');
                    const errText = 'Something is wrong';
                    root.innerHTML = window.signuptemplateTemplate({ errText });
                } else if (res.status === 409) {
                    // alert('StatusConflict');
                    const errText = 'StatusConflict';
                    root.innerHTML = window.signuptemplateTemplate({ errText });
                } else {
                    createProfile();
                }
            }
        });
    });
}

function createScoreboard() {
    let pagesCount;
    let inputPlayers;
    // Заправшиваем кол-во страниц с игроками
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/askForPlayersCount',
        callback(res) {
            if (res.status > 300) {
                // alert('Something wrong');
                const errText = 'Something is wrong';
                root.innerHTML = window.menutemplateTemplate({ errText });
                // createMenu();
                return;
            }
            res.then((data) => {
                pagesCount = data;
            });
        }
    });
    // Заправшиваем игроков
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/askForPlayers',
        callback(res) {
            if (res.status > 300) {
                // alert('Something wrong');
                const errText = 'Can not get leaders';
                root.innerHTML = window.menutemplateTemplate({ errText });
                // createMenu();
                return;
            }
            res.json().then((data) => {
                inputPlayers = data;
            });
        }
    });

    // const inputPlayers = {
    //   'name1': 123,
    //   'name2': 123,
    //   'name 3': 123333,
    // }
    // const pagesCount = 12;

    // Индекс актвиной страницы при первом открытии старницы с лидерами
    const index = 1;

    const scoreboardHtml = window.scoreboardtemplateTemplate({ index, pagesCount, inputPlayers });
    root.innerHTML = scoreboardHtml;

    const pagination = document.getElementById('pagination');

    pagination.addEventListener('click', (event) => {
        event.preventDefault();

        const target = event.target;
        const pageName = target.name;
        // Приводим к числу имя страницы
        // const intPageName = parseInt(pageName, 10);

        // Отправляем индекс страницы на бэк и получаем новых лидеров
        httpRequest.doGet({
            url: 'http://127.0.0.1:8080/leaders',
            data: pageName,

            callback(res) {
                if (res.status > 300) {
                    // console.log('Something wrong');
                    const errText = 'Something wrong';
                    root.innerHTML = window.menutemplateTemplate({ errText });
                    createMenu();
                    return;
                }
                // Отрисовываем новых лидеров
                res.json().then((playersData) => {
                    const scoreboardHtml = window.scoreboardtemplateTemplate({ pageName, pagesCount, playersData });
                    root.innerHTML = scoreboardHtml;
                });
            }
        });
    });
}

function createProfile(me) {
    let playerNickname;

    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/islogged',
        callback(res) {
            if (res.status === 400) {
                // alert('Please login');
                const errText = 'You are not logged in';
                root.innerHTML = window.signintemplateTemplate({ errText });
                // createSignIn();
            }
        }
    });
    // Запрашиваем никнейм пользователя для отображения
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/usernickname',
        callback(res) {
            if (res.status > 300) {
                // alert('Something wrong');
                const errText = 'Something is wrong';
                root.innerHTML = window.menutemplateTemplate({ errText });
                // createMenu();
                return;
            }
            res.json().then((data) => {
                playerNickname = data;
                console.warn(playerNickname);
            });
        }
    });

    const profileHtml = window.profiletemplateTemplate({ playerNickname });
    root.innerHTML = profileHtml;

    if (me) {
        const form = document.getElementById('profileForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const newPassword = form.elements.newpassword.value;
            const repeatNewPassword = form.elements.repeatnewpassword.value;
            // const newNickname = form.elements.newnickname.value;

            const avatarformData = new FormData(form.elemnts.newavatar);

            if (newPassword !== repeatNewPassword) {
                // alert('Password are not equal');
                const errText = 'Password are not equal';
                root.innerHTML = window.profiletemplateTemplate({ errText });
                // createProfile();
                return;
            }

            const JSONdata = {
                password: newPassword,
                nickname: newNickname
            };

            // Смена пароля пользователем
            httpRequest.doPut({
                url: 'http://127.0.0.1:8080/changepass',
                data: JSONdata,
                contentType: 'application/json',
                callback(res) {
                    if (res.status > 300) {
                        // alert('Something was wrong');
                        const errText = 'Something was wrong';
                        root.innerHTML = window.profiletemplateTemplate({ errText });
                    }
                }
            });

            httpRequest.doPost({
                url: 'http://127.0.0.1:8080/changeuserdata',
                data: avatarformData,
                contentType: 'multipart/form-data',
                callback(res) {
                    if (res.status > 300) {
                        // alert('Something was wrong');
                        const errText = 'Something was wrong';
                        root.innerHTML = window.profiletemplateTemplate({ errText });
                        return;
                    }
                    res.json().then((data) => {
                        const imgSrc = data;
                        const profileHtml = window.profiletemplateTemplate({ imgSrc, playerNickname });
                        root.innerHTML = profileHtml;
                    });
                }
            });
        });
    } else {
        httpRequest.doGet({
            url: 'http://127.0.0.1:8080/profile',

            callback(res) {
                console.log(res.status);
                if (res.status > 300) {
                    // alert('Unauthorized');
                    const errText = 'Unauthorized';
                    root.innerHTML = window.menutemplateTemplate({ errText });
                    // createMenu();
                    return;
                }
                res.json().then((user) => {
                    createProfile(user);
                });
            }
        });
    }
}

function createAbout() {
    const aboutHtml = window.abouttemplateTemplate();
    root.innerHTML = aboutHtml;
}

const menuButtons = {
    signin: createSignIn,
    signup: createSignUp,
    leaders: createScoreboard,
    profile: createProfile,
    about: createAbout,
    menu: createMenu
};

root.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    event.preventDefault();

    const target = event.target;
    const eventName = target.name;
    menuButtons[eventName]();
});

createMenu();
