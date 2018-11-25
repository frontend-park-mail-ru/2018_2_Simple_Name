const httpRequest = window.httpModule;

const root = document.getElementById('root');
const Game = window.GameModule;

function createMenu(statusText) {
    httpRequest.doGet({
        url: 'http://95.163.209.195:80/islogged',

        callback(res) {
            let menuHtml = "";
            switch (res.status) {
                case 200:
                    menuHtml = window.menutemplateTemplate({
                        auth: true,
                        statusText
                    });
                    root.innerHTML = menuHtml;
                    break;
                default:
                    menuHtml = window.menutemplateTemplate({
                        auth: false,
                        statusText
                    });
                    root.innerHTML = menuHtml;
            }

            const menuButtons = {
                signin: createSignIn,
                signup: createSignUp,
                leaders: createScoreboard,
                profile: createProfile,
                about: createAbout,
                menu: createMenu,
                startgame: createStartgame,
            };

            const buttons = document.getElementById('buttons');

            buttons.addEventListener('click', (event) => {
                if (!(event.target instanceof HTMLAnchorElement)) return;
                event.preventDefault();

                const target = event.target;
                const eventName = target.name;

                menuButtons[eventName]();
            });

        }
    });
}

function createStartgame() {

    httpRequest.doGet({
        url: 'http://95.163.209.195:80/islogged',
        callback(res) {
            const errText = "";
            switch (res.status) {
                case 401:
                    errText = 'You are not logged in';
                    createSignIn(errText);
                    break;
                case 200:
                    root.innerHTML = "";
                    const gameService = new Game(root, createProfile, createMenu);
            }
        }
    });
}

function createSignIn(statusText) {
    httpRequest.doGet({
        url: 'http://95.163.209.195:80/islogged',

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

    const backToMenu = document.getElementById('backtomenu');

    backToMenu.addEventListener('click', (event) => {
        event.preventDefault();
        createMenu();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = form.elements.email.value;
        const password = form.elements.password.value;

        const JSONdata = {
            email,
            password
        };

        httpRequest.doPost({
            url: 'http://95.163.209.195:80/signin',
            contentType: 'application/json',
            data: JSONdata,

            callback(res) {
                let errText = "";
                switch (res.status) {
                    case 400:
                        errText = 'Wrong login or password';
                        createSignIn(errText);
                        break;
                    case 500:
                        errText = 'Server error';
                        createSignIn(errText);
                        break;
                    case 200:
                        errText = 'You are already loggined!';
                        createProfile(undefined, errText);
                        break;
                }
            }
        });
    });
}

function createSignUp(statusText) {
    httpRequest.doGet({
        url: 'http://95.163.209.195:80/islogged',
        callback(res) {
            if (res.status === 200) {
                const errText = 'You are already authorized';
                createProfile(errText);
            }
        }
    });

    const signupHtml = window.signuptemplateTemplate({ statusText });
    root.innerHTML = signupHtml;

    const backToMenu = document.getElementById('backtomenu');

    backToMenu.addEventListener('click', (event) => {
        event.preventDefault();
        createMenu();
    });

    const form = document.getElementById('signupForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const usrNickname = form.elements.nickname.value;
        if (!usrNickname
            || usrNickname.match(/[#&<>\"~;$^%{}?]/)
            || !usrNickname.match(/\S{3,20}/)) {
            const errText = 'Enter a valid nickname';
            return createSignUp(errText);
        }

        const usrEmail = form.elements.email.value;
        if (!usrEmail
            || !usrEmail.match(/[@]\S{5,50}/)) {
            const errText = 'Enter a valid Email';
            return createSignUp(errText);
        }

        const usrPass = form.elements.password.value;
        const repeatPass = form.elements.repeatPassword.value;
        const warnText = passValidation(usrPass, repeatPass);
        if (warnText) { return createSignUp(warnText); }

        const JSONdata = {
            'nick': usrNickname,
            'email': usrEmail,
            'password': usrPass
        };

        httpRequest.doPost({
            url: 'http://95.163.209.195:80/signup',
            data: JSONdata,
            contentType: 'application/json',

            callback(res) {
                let errText = "";
                switch (res.status) {
                    case 208:
                        errText = 'Email already exist';
                        createSignUp(errText);
                        break;
                    case 400:
                        errText = 'Something is wrong';
                        createSignUp(errText);
                        break;
                    case 409:
                        errText = 'StatusConflict';
                        createSignUp(errText);
                        break;
                    default:
                        createProfile();
                }
            }
        });
    });
}

function createScoreboard(statusText, playersCount, pageIndex = 1) {
    let pagesCount;
    // Кол-во игроков на странице
    const playersOnPage = 5;
    // Заправшиваем кол-во всех игроков

    if (playersCount === undefined) {
        httpRequest.doGet({
            url: '/leaderscount',
            callback(res) {
                if (res.status > 300) {
                    const errText = 'Something is wrong';
                    createMenu(errText);
                }

                res.json().then((data) => {
                    createScoreboard(undefined, data.leaderscount);
                });
            }
        });
    } else {

        pagesCount = playersCount / playersOnPage + 1;
        // Заправшиваем игроков
        httpRequest.doGet({
            url: `/leaders?limit=${
                playersOnPage
                }&offset=${
                playersOnPage * (pageIndex - 1)}`,
            callback(res) {
                if (res.status > 300) {
                    const errText = 'Can not get leaders';
                    createMenu(errText);
                }
                res.json().then((inputPlayers) => {

                    const scoreboardHtml = window.scoreboardtemplateTemplate({
                        pageIndex,
                        pagesCount,
                        inputPlayers,
                        statusText
                    });

                    root.innerHTML = scoreboardHtml;

                    const backToMenu = document.getElementById('backtomenu');

                    backToMenu.addEventListener('click', (event) => {
                        event.preventDefault();
                        createMenu();
                    });

                    const pagination = document.getElementById('pagination');

                    pagination.addEventListener('click', (event) => {
                        event.preventDefault();

                        const target = event.target;
                        const pageNumber = parseInt(target.name, 10);

                        createScoreboard(undefined, playersCount, pageNumber);
                    });

                });
            }
        });


    }
}

function createProfile(userInfo, statusText) {
    let errText = "";
    if (userInfo === undefined) {
        httpRequest.doGet({
            url: 'http://95.163.209.195:80/islogged',
            callback(res) {
                switch (res.status) {
                    case 401:
                        errText = 'You are not logged in';
                        createSignIn(errText);
                    case 200:
                        httpRequest.doGet({
                            url: 'http://95.163.209.195:80/profile',
                            callback(res) {
                                if (res.status > 300) {
                                    errText = 'Something is wrong';
                                    createMenu(errText);
                                }
                                res.json().then((profileInfo) => {
                                    createProfile(profileInfo, undefined);
                                });
                            }
                        });
                }
            }
        });
    } else {
        const playerNickname = userInfo.nick;
        const playerScore = userInfo.score;
        const playerEmail = userInfo.email;

        const profileHtml = window.profiletemplateTemplate({
            playerNickname,
            playerEmail,
            playerScore,
            statusText
        });

        root.innerHTML = profileHtml;

        const backToMenu = document.getElementById('backtomenu');

        backToMenu.addEventListener('click', (event) => {
            event.preventDefault();
            createMenu();
        });

        const form = document.getElementById('profileForm');
        const logout = document.getElementById('logout');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const newPassword = form.elements.newpassword.value;
            const repeatNewPassword = form.elements.repeatnewpassword.value;

            if (newPassword !== repeatNewPassword) {
                errText = 'Password are not equal';
                createProfile(userInfo, errText);
            }

            const JSONdata = {
                password: newPassword
            };

            // Смена пароля пользователем
            const changePassword = newPassword !== "";

            if (changePassword) {
                httpRequest.doPut({
                    url: 'http://95.163.209.195:80/profile',
                    data: JSONdata,
                    contentType: 'application/json',
                    callback(res) {
                        switch (res.status) {
                            case 200:
                                errText = 'Pass changed successfuly';
                                res.json.then((userData) => {
                                    createProfile(userData, errText);
                                });
                                break;
                            default:
                                errText = 'Something was wrong';
                                createProfile(userInfo, errText);
                        }
                    }
                });
            }

            const changeAvatar = form.elements.newavatar.value !== "";

            if (changeAvatar) {
                const avatarformData = new FormData();

                avatarformData.append("new_avatar", form.elements.newavatar.files[0], "new_avatar");

                fetch("http://95.163.209.195:80/profile", {
                    method: "POST",
                    body: avatarformData
                }).then((res) => {
                    switch (res.status) {
                        case 200:
                            errText = 'New avatar uploaded';
                            createProfile(undefined, errText);
                            break;
                        default:
                            errText = 'Something was wrong';
                            createMenu(errText);
                    }

                });
            }


        });

        logout.addEventListener('click', (event) => {
            event.preventDefault();
            httpRequest.doGet({
                url: 'http://95.163.209.195:80/logout',
                callback(res) {
                    switch (res.status) {
                        case 500:
                            errText = 'Server error';
                            createProfile(errText);
                            break;
                        case 200:
                            errText = 'You are succsesfuly logouted';
                            createMenu(errText);
                            break;
                    }
                }
            });
        });

    }
}

function createAbout() {
    const aboutHtml = window.abouttemplateTemplate();
    root.innerHTML = aboutHtml;

    const backToMenu = document.getElementById('backtomenu');

    backToMenu.addEventListener('click', (event) => {
        event.preventDefault();
        createMenu();
    });
}

// Валидация данных для имени
// function nameValidation(fName, lName) {
//     if (!fName) {
//         const errText = 'Enter your First Name';
//         return errText;
//     }

//     if (!fName.match(/[a-z]{2,20}$/)) {
//         const errText = 'Enter a valid First Name';
//         return errText;
//     }

//     if (!lName) {
//         const errText = 'Enter your Last Name';
//         return errText;
//     }

//     if (!lName.match(/[a-z]{2,20}$/)) {
//         const errText = 'Enter a valid Last Name';
//         return errText;
//     }
// }

function passValidation(pass1, pass2) {
    if (!pass1.match(/\S{2,128}/)) {
        const errText = 'Password must contain 2 or > symbols';
        return errText;
    }

    if (!pass1.match(/[A-Z][a-z]/)) {
        const errText = 'Password must contain one larger symbol and one lower symbol';
        return errText;
    }
    if (pass1 !== pass2) {
        const errText = 'Passwords are not equal';
        return errText;
    }
}

createMenu();
