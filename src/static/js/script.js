'use strict';

import { Form } from './components/form.js';

const httpReq = window.httpModule;

const root = document.getElementById("root");

function createMenu() {
    const menuHtml = window.menuTemplate();
    root.innerHTML = menuHtml;
}

function createSignIn() {
    const signinHtml = window.signinTemplate();
    root.innerHTML = signinHtml

    //     httpReq.doPost({
    //         url: '/signin',
    //         callback(res) {
    //             if (res.status == 404) {
    //                 alert("Wrong login or password");
    //                 return;
    //             }
    //             if (res.status == 400) {
    //                 alert("Wrong email or password")
    //             }
    //             if (res.status == 200) {
    //                 alert("You are log in!")
    //                 createProfile();
    //             }
    //         },
    //         data: formData
    //     })
    // });

}

function createSignUp() {
    const signupHtml = window.signupTemplate();
    root.innerHTML = signupHtml

    //
    // httpReq.doGet({
    //     callback(res) {
    //         if (res.status > 300) {
    //             alert("You already register");
    //             root.innerHTML = '';
    //             createMenu();
    //             return;
    //         }
    //     },
    //     url: '/signup'
    // });

    // form.addEventListener('submit', function (event) {
    //
    //     event.preventDefault();
    //     const name = form.elements['name'].value;
    //     const last_name = form.elements['last_name'].value;
    //     const nick = form.elements['nick'].value;
    //     const email = form.elements['email'].value;
    //     const password = form.elements['password'].value;
    //     const password_repeat = form.elements['password_repeat'].value;
    //
    //     if (password !== password_repeat) {
    //         alert('Passwords is not equals');
    //         return;
    //     }
    //     if (email == "") {
    //         alert("Enter email!")
    //         return
    //     }
    //
    //     let formData = new FormData()
    //     formData.append("name", name)
    //     formData.append("last_name", last_name)
    //     formData.append("nick", nick)
    //
    //     formData.append("password", password)
    //     formData.append("email", email)
    //
    //
    //     httpReq.doPost({
    //         callback(res) {
    //             console.log(res.status)
    //             if (res.status == 208) {
    //                 alert("Email already exist");
    //                 return;
    //             }
    //             if (res.status == 400) {
    //                 alert("Something is wrong");
    //                 return;
    //             }
    //             if (res.status == 409) {
    //                 alert("StatusConflict");
    //                 return;
    //             }
    //             createProfile();
    //         },
    //         url: '/signup',
    //         data: formData
    //     });
    // });

}

function createScoreboard(nextPageNumber) {

    httpReq.doGet({

    })

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
    // httpReq.doGet({
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
    //         httpReq.doPost({ // Отправка аватарки
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
    //     httpReq.doGet({
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