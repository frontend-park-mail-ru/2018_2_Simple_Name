const httpRequest = window.httpModule;

const root = document.getElementById('root');

function createMenu(statusText) {
    httpRequest.doGet({
        url: '/islogged',

        callback(res) {

            if (res.status === 200) {
                const menuHtml = window.menutemplateTemplate({
                    auth: true,
                    statusText
                });
                root.innerHTML = menuHtml;
            } else {
                const menuHtml = window.menutemplateTemplate({
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
    // httpRequest.doGet({
    //     url: '/islogged',
    //     callback(res) {
    //         if (res.status === 200) {
    //             const errText = 'You are already authorized';
    //             createProfile(errText);
    //         }
    //     }
    // });

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

        const frstName = form.elements.firstname.value;
        const lstName = form.elements.lastname.value;
        let warnText = nameValidation(frstName, lstName);
        if(warnText) { return createSignUp(warnText); }

        const usrAge = form.elements.age.value;
        if (!usrAge) {
            const errText = 'Enter your age';
            return createSignUp(errText);
        }

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
        warnText = passValidation(usrPass, repeatPass);
        if(warnText) { return createSignUp(warnText); }

        const intAge = parseInt(usrAge, 10);

        const JSONdata = {
            'name': frstName,
            'last_name': lstName,
            'age': intAge,
            'nick': usrNickname,
            'email': usrEmail,
            'password': usrPass
        };

        // httpRequest.doPost({
        //     url: '/signup',
        //     data: JSONdata,
        //     contentType: 'application/json',

        //     callback(res) {
        //         if (res.status === 208) {
        //             const errText = 'Email already exist';
        //             createSignUp(errText);
        //         } else if (res.status === 400) {
        //             const errText = 'Something is wrong';
        //             createSignUp(errText);
        //         } else if (res.status === 409) {
        //             const errText = 'StatusConflict';
        //             createSignUp(errText);
        //         } else {
        //             createProfile();
        //         }
        //     }
        // });
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
                        createMenu(errText);
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
}

// Валидация данных для имени
function nameValidation(fName, lName) {
    if (!fName) {
        const errText = 'Enter your First Name';
        return errText;
    }

    if (!fName.match(/[a-z]{2,20}$/)) {
        const errText = 'Enter a valid First Name';
        return errText;
    }

    if (!lName) {
        const errText = 'Enter your Last Name';
        return errText;
    }

    if (!lName.match(/[a-z]{2,20}$/)) {
        const errText = 'Enter a valid Last Name';
        return errText;
    }
}

function passValidation(pass1, pass2) {
    if (!pass1.match(/\S{8,}/)) {
        const errText = 'Password must be 8 or longer symbols';
        return errText;
    }

    if (!pass1.match(/[A-Z]/)) {
        const errText = 'Password must contain ta least one larger symbol';
        return errText;
    }
    if (pass1 !== pass2) {
        const errText = 'Passwords are not equal';
        return errText;
    }
}

createMenu();
