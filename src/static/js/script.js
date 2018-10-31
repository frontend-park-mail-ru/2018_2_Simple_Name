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
                alert("You already auth")
                createMenu()
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
                    alert("¯\\_(ツ)_/¯")
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
                alert("You already auth")
                createMenu()
            }
        },
    });


    const signupHtml = window.signupTemplate();
    root.innerHTML = signupHtml;

    const form = document.getElementById('signupForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const firstname = form.elements["firstname"].value;
        const lastName = form.elements['lastname'].value;
        const nickname = form.elements['nickname'].value;
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const repeatPassword = form.elements['repeatPassword'].value;


        if (password !== repeatPassword) {
            alert('Passwords is not equals');
            return;
        }
        if (email === "") {
            alert("Enter email!");
            return
        }

        const JSONdata = {
            "name": firstname,
            "last_name": lastName,
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
                }
                if (res.status === 208) {
                    alert("Email already exist");
                    return;
                }
                if (res.status === 400) {
                    alert("Something is wrong");
                    return;
                }
                if (res.status === 409) {
                    alert("StatusConflict");
                    return;
                }
                createProfile();
            },
        });
    });
}

function createScoreboard(nextPageNumber) {

    const scoreboardHtml = window.scoreboardTemplate({ inputPlayers: { 'name': 123, 'name1': 1232, 'name2': 1121323 } });
    root.innerHTML = scoreboardHtml;

    const pagination = document.getElementById("pagination");

    pagination.addEventListener("click", function (event) {
        if (!(event.target instanceof HTMLAnchorElement)) return;

        event.preventDefault();

        const nextPageNumber = event.pagination__number;
        createScoreboard(nextPageNumber);
    });

    // /*  const em = document.createElement('em');
    //   em.textContent = 'Nothing to display';
    //   body.appendChild(em);*/
    //
    // // xhr.open('POST', '/liderboards', true);
    // // xhr.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
    // // xhr.send('Request');
    //
    //
    // httpRequest.doGet({
    //     callback(res) {
    //         if (res.status > 300) {
    //             alert('Something wrong');
    //             root.innerHTML = '';
    //             createMenu();
    //             return;
    //         }
    //         res.json().then(function (top) {
    //
    //             const tbody = document.createElement('tbody');
    //
    //             let username;
    //             let score;
    //             let age;
    //
    //             Object.entries(top).forEach(function ([id, info]) {
    //                 username = info.nick;
    //                 score = info.Score;
    //                 age = info.Age;
    //
    //
    //                 const tr = document.createElement('tr');
    //                 const tdUsername = document.createElement('td');
    //                 const tdScore = document.createElement('td');
    //                 const tdAge = document.createElement('td');
    //
    //                 tdUsername.textContent = username;
    //                 tdScore.textContent = score;
    //                 tdAge.textContent = age;
    //
    //                 tr.appendChild(tdUsername);
    //                 tr.appendChild(tdScore);
    //                 tr.appendChild(tdAge);
    //
    //                 tbody.appendChild(tr);
    //
    //                 table.appendChild(tbody);
    //             });
    //         });
    //     },
    //     url: '/leaders'
    //
    // });
    //
    // body.appendChild(table);
    // root.appendChild(body);

}

function createProfile(me) {
    httpRequest.doGet({
        url: 'http://127.0.0.1:8080/islogged',

        callback(res) {
            if (res.status == 400){
                alert("Please login");
                createSignIn();
            }
        },
    });

    const profileHtml = window.profileTemplate();
    root.innerHTML = profileHtml;
    //
    // if (me) {
    //     form.addEventListener('submit', function (event) {
    //
    //         event.preventDefault();
    //
    //         let formData = new FormData(document.forms.profileForm);
    //         //file is actually new FileReader.readAsData(myId.files[0]);
    //         //  formData.append("my_file", avatar);
    //
    //         const password = form.elements['password'].value;
    //         const password_repeat = form.elements['password_repeat'].value;
    //
    //         if (password !== password_repeat) {
    //             alert('Passwords is not equals');
    //             return;
    //         }
    //
    //         formData.append("password", password)
    //
    //
    //         httpRequest.doPost({ // Отправка аватарки
    //             callback(res) {
    //                 if (res.status > 300) {
    //                     alert("Something was wrong");
    //                     return;
    //                 }
    //                 createProfile();
    //             },
    //             url: '/profile',
    //             data: formData
    //         });
    //
    //     });
    // } else {
    //     httpRequest.doGet({
    //         callback(res) {
    //             console.log("Create prof")
    //             console.log(res.status);
    //             if (res.status > 300) {
    //                 alert('Unauthorized');
    //                 root.innerHTML = '';
    //                 createMenu();
    //                 return;
    //             }
    //             //let respon = res.json();
    //             //const user = JSON.parse(res.responseText);
    //
    //             res.json().then(function (user) {
    //                 root.innerHTML = '';
    //                 createProfile(user);
    //             });
    //
    //         },
    //         url: '/profile'
    //     })
    // }

}

function createAbout() {

    // const link = createLinkMenu();

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