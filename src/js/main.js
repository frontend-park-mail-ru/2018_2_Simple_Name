const httpRequest = window.httpModule;

const root = document.getElementById('root');

function createMenu(statusText) {
    const menuHtml = window.menutemplateTemplate({ statusText });
    root.innerHTML = menuHtml;
}

function createSignIn(statusText) {
    httpRequest.doGet({
        url: '/islogged',

        callback(res) {
            if (res.status === 200) {
                const errText = 'You already authorized';
                createProfile(errText);
            }
        }
    });

    const signinHtml = window.signintemplateTemplate({ statusText });
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
            url: '/signin',
            contentType: 'application/json',
            data: JSONdata,

            callback(res) {
                if (res.status === 400) {
                    const errText = 'Wrong login or password';
                    createSignin(errText);
                    return;
                }
                if (res.status === 500) {
                    const errText = 'Server error';
                    createSignin(errText);
                    return;
                }
                if (res.status === 200) {
                    const errText = 'You are already loggined!';
                    createProfile(errText);
                }
            }
        });
    });
}

function createSignUp(statusText) {
    httpRequest.doGet({
        url: '/islogged',
        callback(res) {
            if (res.status === 200) {
                const errText = 'You are already authorized';
                createProfile(errText);
            }
        }
    });

    const signupHtml = window.signuptemplateTemplate({ statusText });
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
            const errText = 'Passwords is not equals';
            createSignup(errText);
            return;
        } if (email === '') {
            createSignup(errText);
            return;
        }

        const intAge = parseInt(age, 10);

        const JSONdata = {
            'name': firstname,
            'last_name': lastname,
            'age': intAge,
            'nick': nickname,
            'email': email,
            'password': password
        };

        httpRequest.doPost({
            url: '/signup',
            data: JSONdata,
            contentType: 'application/json',

            callback(res) {
                console.log(res.status);
                if (res.status > 300) {
                    const errText = 'You already register';
                    createMenu(errText);
                    createMenu();
                } else if (res.status === 208) {
                    const errText = 'Email already exist';
                    createSignup(errText);
                } else if (res.status === 400) {
                    const errText = 'Something is wrong';
                    createSignup(errText);
                } else if (res.status === 409) {
                    const errText = 'StatusConflict';
                    createSignup(errText);
                } else {
                    createProfile();
                }
            }
        });
    });
}

function createScoreboard(statusText, topPlayers, topPlayersCount, pageIndex, pageCount) {
    let pagesCount;
    let inputPlayers;
    let playersCount = this.playersCount;
    // Кол-во игроков на странице
    const playersOnPage = 5;
    // Индекс актвиной страницы при первом открытии старницы с лидерами
    const index = 1;
    // Заправшиваем кол-во всех игроков
    httpRequest.doGet({
        url: '/leaderscount',
        callback(res) {
            if (res.status > 300) {
                const errText = 'Something is wrong';
                createMenu(errText);
                return;
            }
            res.json().then((data) => {
                playersCount = data.leaderscount;
            });
        }
    });

    console.log(playersCount);
    // Заправшиваем игроков
    httpRequest.doGet({
        url: `/leaders?limit=${
            playersOnPage
            }&offset=${
            playersOnPage * index}`,
        callback(res) {
            if (res.status > 300) {
                const errText = 'Can not get leaders';
                createMenu(errText);
                return;
            }
            res.json().then((data) => {
                Object.entries(data).forEach(() => {
                    inputPlayers = data.leaders;
                });
            });
        }
    });

    //Получаем количество страниц для пагинации
    pagesCount = playersCount / playersOnPage;

    const scoreboardHtml = window.scoreboardtemplateTemplate({ index, pagesCount, inputPlayers, statusText });
    root.innerHTML = scoreboardHtml;

    const pagination = document.getElementById('pagination');

    pagination.addEventListener('click', (event) => {
        event.preventDefault();

        const target = event.target;
        const pageName = target.name;

        // Отправляем limit и offset страницы на бэк и получаем новых лидеров
        httpRequest.doGet({
            url: `/leaders?limit=${
                playersOnPage
                }&offset=${
                playersOnPage * PageName}`,

            callback(res) {
                if (res.status > 300) {
                    const errText = 'Something wrong';
                    createMenu(errText);
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

function createProfile(userInfo, statusText) {
    let playerNickname;
    let playerFirstname;
    let playerLastname;
    let playerEmail;
    let playerScore;
    let playerAge;

    if (userInfo === undefined) {
        httpRequest.doGet({
            url: '/islogged',
            callback(res) {
                if (res.status === 401) {
                    const errText = 'You are not logged in';
                    createSignIn(errText);
                    return;
                }
            }
        });
    }

    // Запрашиваем данные пользователя
    if (userInfo === undefined) {
        httpRequest.doGet({
            url: '/profile',
            callback(res) {
                if (res.status > 300) {
                    const errText = 'Something is wrong';
                    createMenu(errText);
                    return;
                }
                res.json().then((profileInfo) => {
                    createProfile(profileInfo);
                });
            }
        });
    }

    playerNickname = userInfo.nick;
    playerScore = userInfo.score;
    playerAge = userInfo.age;
    playerFirstname = userInfo.name;
    playerLastname = userInfo.last_name;
    playerEmail = userInfo.email;

    const profileHtml = window.profiletemplateTemplate({
        playerNickname,
        playerAge,
        playerFirstname,
        playerLastname,
        playerEmail,
        playerScore,
        statusText
    });
    root.innerHTML = profileHtml;

    const form = document.getElementById('profileForm');
    const logout = document.getElementById('logout');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const newPassword = form.elements.newpassword.value;
        const repeatNewPassword = form.elements.repeatnewpassword.value;

        const avatarformData = new FormData(form.elemnts.newavatar);

        if (newPassword !== repeatNewPassword) {
            const errText = 'Password are not equal';
            createProfile(errText);
            return;
        }

        const JSONdata = {
            password: newPassword
        };

        // Смена пароля пользователем
        httpRequest.doPut({
            url: '/profile',
            data: JSONdata,
            contentType: 'application/json',
            callback(res) {
                if (res.status > 300) {
                    const errText = 'Something was wrong';
                    createProfile(errText);
                }
                if (res.status === 200) {
                    const errText = 'Pass changed successfuly';
                    createProfile(errText);
                }
            }
        });

        httpRequest.doPost({
            url: '/profile',
            data: avatarformData,
            contentType: 'multipart/form-data',
            callback(res) {
                if (res.status > 300) {
                    const errText = 'Something was wrong';
                    createProfile(errText);
                    return;
                }
                if (res.status === 200) {
                    const errText = 'New avatar uploaded';
                    createProfile(errText);
                }
                res.json().then((data) => {
                    const imgSrc = data;
                    const profileHtml = window.profiletemplateTemplate({ imgSrc, playerNickname });
                    root.innerHTML = profileHtml;
                });
            }
        });
    });

    logout.addEventListener('click', (event) => {
        event.preventDefault();
        httpRequest.doGet({
            url: '/logout',
            callback(res) {
                if (res.status === 500) {
                    const errText = 'Server error';
                    createProfile(errText);
                }
                if (res.status === 200) {
                    const errText = 'You are succsesfuly logouted';
                    createMenu(errText);
                }
            }
        });
    });
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
