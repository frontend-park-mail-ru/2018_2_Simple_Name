const httpRequest = window.httpModule;

const root = document.getElementById('root');

function createMenu(statusText) {
    const menuHtml = window.menutemplateTemplate({ statusText });
    root.innerHTML = menuHtml;


    const menuButtons = {
        signin: createSignIn,
        signup: createSignUp,
        leaders: createScoreboard,
        profile: createProfile,
        about: createAbout,
        menu: createMenu
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

    const goback = document.getElementById('backtomenu');
    goback.addEventListener('click', (event) => {
        event.preventDefault();
        createMenu();
    });

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
                    createSignIn(errText);
                }
                if (res.status === 500) {
                    const errText = 'Server error';
                    createSignIn(errText);
                }
                if (res.status === 200) {
                    const errText = 'You are already loggined!';
                    createProfile(undefined, errText);
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

    const goback = document.getElementById('backtomenu');
    goback.addEventListener('click', (event) => {
        event.preventDefault();
        createMenu();
    });

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
            createSignUp(errText);
        } if (email === '') {
            createSignUp(errText);
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
                    createSignUp(errText);
                } else if (res.status === 400) {
                    const errText = 'Something is wrong';
                    createSignUp(errText);
                } else if (res.status === 409) {
                    const errText = 'StatusConflict';
                    createSignUp(errText);
                } else {
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
    // Индекс актвиной страницы при первом открытии старницы с лидерами
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
        // Заправшиваем игроков

        pagesCount = playersCount / playersOnPage + 1;

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
                res.json().then((players) => {

                    const scoreboardHtml = window.scoreboardtemplateTemplate({
                        index: pageIndex,
                        pagesCount,
                        inputPlayers: players,
                        statusText
                    });

                    root.innerHTML = scoreboardHtml;


                    const goback = document.getElementById('backtomenu');
                    goback.addEventListener('click', (event) => {
                        event.preventDefault();
                        createMenu();
                    });


                    const pagination = document.getElementById('pagination');

                    pagination.addEventListener('click', (event) => {
                        event.preventDefault();

                        const target = event.target;
                        const pageNumber = target.name;

                        createScoreboard(undefined, playersCount, pageNumber);
                    });

                });
            }
        });


    }
}

function createProfile(userInfo, statusText) {
    if (userInfo === undefined) {
        httpRequest.doGet({
            url: '/islogged',
            callback(res) {
                if (res.status === 401) {
                    const errText = 'You are not logged in';
                    createSignIn(errText);
                }
                if (res.status === 200) {
                    httpRequest.doGet({
                        url: '/profile',
                        callback(res) {
                            if (res.status > 300) {
                                const errText = 'Something is wrong';
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
        const playerAge = userInfo.age;
        const playerFirstname = userInfo.name;
        const playerLastname = userInfo.last_name;
        const playerEmail = userInfo.email;

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

        const goback = document.getElementById('backtomenu');
        goback.addEventListener('click', (event) => {
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
                const errText = 'Password are not equal';
                createProfile(userInfo, errText);
            }

            const JSONdata = {
                password: newPassword
            };

            // Смена пароля пользователем
            const changePassword = newPassword !== "";

            if (changePassword) {
                httpRequest.doPut({
                    url: '/profile',
                    data: JSONdata,
                    contentType: 'application/json',
                    callback(res) {
                        if (res.status > 300) {
                            const errText = 'Something was wrong';
                            createProfile(userInfo, errText);
                        }
                        if (res.status === 200) {
                            const errText = 'Pass changed successfuly';
                            res.json.then((userData) => {
                                createProfile(userData, errText);
                            });
                        }
                    }
                });
            }

            const changeAvatar = form.elements.newavatar.value !== "";

            if (changeAvatar) {
                const avatarformData = new FormData();

                avatarformData.append("new_avatar", form.elements.newavatar.files[0], "new_avatar");

                fetch("/profile", {
                    method: "POST",
                    body: avatarformData
                }).then((res) => {
                    if (res.status > 300) {
                        const errText = 'Something was wrong';
                        createMenu();
                    }
                    if (res.status === 200) {
                        const errText = 'New avatar uploaded';
                        createProfile(undefined, errText);
                    }
                });
            }


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
}

function createAbout() {
    const aboutHtml = window.abouttemplateTemplate();
    root.innerHTML = aboutHtml;

    const goback = document.getElementById('backtomenu');
    goback.addEventListener('click', (event) => {
        event.preventDefault();
        createMenu();
    });
}

createMenu();
