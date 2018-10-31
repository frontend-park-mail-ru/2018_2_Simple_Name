'use strict';

const httpRequest = window.httpModule;

const root = document.getElementById("root");

function createMenu() {
    const menuHtml = window.menuTemplate();
    root.innerHTML = menuHtml;
}

function createSignIn() {
    const signinHtml = window.signinTemplate();
    root.innerHTML = signinHtml

    const form = document.getElementById('siginForm');

    form.addEventListener('submit', function (event) {

        event.preventDefault();
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        const jsonSigninData = {
            email: email,
            password: password
        }

        httpRequest.doPost({
            url: '/signin',
            contentType: 'application/json',
            data: jsonSigninData,

            callback(res) {
                if (res.status == 400) {
                    alert("Wrong email or password")
                } else if (res.status == 200) {
                    alert("You are already logged in!")
                    createProfile();
                } else if (res.status == 201) {
                    createProfile();
                }
            },
        });
    });
}

function createSignUp() {
    const signupHtml = window.signupTemplate();
    root.innerHTML = signupHtml

    const form = document.getElementById('signupForm');

    form.addEventListener('submit', function (event) {

        event.preventDefault();

        const firstname = form.elements['firstname'].value;
        const lastName = form.elements['lastName'].value;
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

        const jsonSignupData = {
            firstName: firstname,
            lastName: lastName,
            nickname: nickname,
            email: email,
            password: password,
            repeatPassword: repeatPassword
        }

        httpRequest.doPost({
            url: '/signup',
            data: jsonSignupData,
            contentType: 'application/json',

            callback(res) {
                console.log(res.status)
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

function createScoreboard(nextPageNumber) {
    const page = 1;
    const inputPlayers = {
        'name': 123,
        'name1': 1232,
        'name2': 1121323,
        'name3': 123,
        'name4': 22222,
        'name5': 44343,
        'name6': 12312333,
    }
    const scoreboardHtml = window.scoreboardTemplate({inputPlayers}, nextPageNumber);
    root.innerHTML = scoreboardHtml;

    createScoreboard(page);
    
    // const pagination = document.getElementById("pagination");

    // pagination.addEventListener("click", function (event) {
    //     if (!(event.target instanceof HTMLAnchorElement)) return;

    //     event.preventDefault();
    // });

    // httpRequest.doGet({
    //     callback(res) {
    //         if (res.status > 300) {
    //             alert('Something wrong');
    //             root.innerHTML = '';
    //             createMenu();
    //             return;
    //         }
    //         res.json().then(function (top) {

    //             const tbody = document.createElement('tbody');

    //             let username;
    //             let score;
    //             let age;

    //             Object.entries(top).forEach(function ([id, info]) {
    //                 username = info.nick;
    //                 score = info.Score;
    //                 age = info.Age;


    //                 const tr = document.createElement('tr');
    //                 const tdUsername = document.createElement('td');
    //                 const tdScore = document.createElement('td');
    //                 const tdAge = document.createElement('td');

    //                 tdUsername.textContent = username;
    //                 tdScore.textContent = score;
    //                 tdAge.textContent = age;

    //                 tr.appendChild(tdUsername);
    //                 tr.appendChild(tdScore);
    //                 tr.appendChild(tdAge);

    //                 tbody.appendChild(tr);

    //                 table.appendChild(tbody);
    //             });
    //         });
    //     },
    //     url: '/leaders'
    // });
}

function createProfile(me) {
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
            //     repeatPassword: repeadPassword
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
            callback(res) {
                console.log(res.status);
                if (res.status > 300) {
                    alert('Unauthorized');
                    root.innerHTML = '';
                    createMenu();
                    return;
                }
                //let respon = res.json();
                //const user = JSON.parse(res.responseText);

                res.json().then(function (user) {
                    root.innerHTML = '';
                    createProfile(user);
                });

            },
            url: '/profile'
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