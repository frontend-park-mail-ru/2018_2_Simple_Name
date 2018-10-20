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
    // root.innerHTML = '';
    //
    // const header = document.createElement('div');
    // header.dataset.sectionName = 'header';
    // header.id = "header";
    // root.appendChild(header);
    //
    // httpReq.doGet({
    //     callback(res) {
    //         if (res.status > 300) {
    //             alert("You already logged in");
    //             root.innerHTML = '';
    //             createMenu();
    //             return;
    //         }
    //     },
    //     url: '/signin'
    // });
    //
    // const logo = document.createElement('span');
    // logo.id = 'logo';
    // const headerTitle = document.createElement('h1');
    // headerTitle.textContent = 'Sign in';
    // headerTitle.id = "headerTitle";
    //
    // header.appendChild(logo);
    // header.appendChild(headerTitle);
    //
    // const body = document.createElement('div');
    // body.id = 'body';
    // root.appendChild(body);
    //
    // const formblock = document.createElement('div');
    // formblock.id = 'formblock';
    // body.appendChild(formblock)
    //
    // const inputs = [
    //     {
    //         name: 'email',
    //         type: 'email',
    //         placeholder: 'Email'
    //     },
    //     {
    //         name: 'password',
    //         type: 'password',
    //         placeholder: 'Password'
    //     },
    //     {
    //         name: 'submit',
    //         type: 'submit',
    //         value: 'Submit'
    //     }
    // ];
    // const formObj = new Form();
    // const form = formObj.render({ inputs: inputs, formId: 'signinForm' })
    // formblock.appendChild(form);
    //
    // const pLink = document.createElement('p');
    // form.appendChild(pLink);
    // const link = createLinkMenu()
    // pLink.appendChild(link);
    //
    // form.addEventListener('submit', function (event) {
    //     event.preventDefault();
    //
    //     const email = form.elements['email'].value;
    //     const password = form.elements['password'].value;
    //     if (email == "" || password == "") {
    //         alert("Enter email!")
    //         return
    //     }
    //
    //     let formData = new FormData()
    //     formData.append("password", password)
    //     formData.append("email", email)
    //
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
    // root.innerHTML = '';
    //
    // const header = document.createElement('div');
    // header.dataset.sectionName = 'header';
    // header.id = "header";
    // root.appendChild(header);
    //
    // const logo = document.createElement('span');
    // logo.id = 'logo';
    // const headerTitle = document.createElement('h1');
    // headerTitle.textContent = 'Sign up';
    // headerTitle.id = "headerTitle";
    //
    // header.appendChild(logo);
    // header.appendChild(headerTitle);
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
    //
    // const body = document.createElement('div');
    // body.id = 'body';
    // root.appendChild(body);
    //
    // const formblock = document.createElement('div');
    // formblock.id = 'formblock';
    // body.appendChild(formblock)
    // const inputs = [
    //     {
    //         name: 'name',
    //         placeholder: 'Name'
    //     },
    //     {
    //         name: 'last_name',
    //         placeholder: 'Last name'
    //     },
    //     {
    //         name: 'nick',
    //         placeholder: 'Nick'
    //     },
    //     {
    //         name: 'email',
    //         type: 'email',
    //         placeholder: 'Email'
    //     },
    //     {
    //         name: 'password',
    //         type: 'password',
    //         placeholder: 'Password'
    //     },
    //     {
    //         name: 'password_repeat',
    //         type: 'password',
    //         placeholder: 'Repeat Password'
    //     },
    //     {
    //         name: 'submit',
    //         type: 'submit',
    //         value: 'Submit'
    //     }
    // ];
    // const formObj = new Form()
    // const form = formObj.render({ inputs: inputs, formId: 'signupForm' })
    // formblock.appendChild(form);
    //
    // const pLink = document.createElement('p');
    // form.appendChild(pLink);
    //
    // const link = createLinkMenu()
    // pLink.appendChild(link);
    //
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

function createLeaders() {
    const scoreboardHtml = window.scoreboardTemplate();
    root.innerHTML = scoreboardHtml;
    // root.innerHTML = '';
    //
    // const header = document.createElement('div');
    // header.dataset.sectionName = 'header';
    // header.id = "header";
    // root.appendChild(header);
    //
    // const logo = document.createElement('span');
    // logo.id = 'logo';
    // const headerTitle = document.createElement('h1');
    // headerTitle.textContent = 'Leaderboard';
    // headerTitle.id = "headerTitle";
    //
    // header.appendChild(logo);
    // header.appendChild(headerTitle);
    //
    // const body = document.createElement('div');
    // body.id = 'body';
    //
    // const pLink = document.createElement('p');
    // headerTitle.appendChild(pLink);
    // const link = createLinkMenu()
    // pLink.appendChild(link);
    //
    // const table = document.createElement('table');
    //
    // table.border = 1;
    //
    // const tableHeader = document.createElement('tr');
    // const th1 = document.createElement('th');
    // const th2 = document.createElement('th');
    // const th3 = document.createElement('th');
    //
    // th1.innerText = 'Nick';
    // th2.innerText = 'Score';
    // th3.innerText = 'Age';
    //
    // tableHeader.appendChild(th1);
    // tableHeader.appendChild(th2);
    // tableHeader.appendChild(th3);
    //
    // table.appendChild(tableHeader);
    //
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
    // root.innerHTML = '';
    // const logo = document.createElement('div');
    // logo.classList.add("p_name");
    //
    // const logo_header = document.createElement('h1');
    // logo_header.innerHTML = 'Profile';
    // logo.appendChild(logo_header);
    //
    // root.appendChild(logo);
    //
    // const body = document.createElement('div');
    // body.id = 'body';
    // root.appendChild(body);
    //
    //
    // if (me) {
    //     const formblock = document.createElement('div');
    //     const img = document.createElement('img');
    //     img.src = "static/media/" + me.Uid;
    //     body.appendChild(img);
    //
    //     //Вывод имени, фамилии!
    //
    //     formblock.id = 'formblock';
    //     body.appendChild(formblock);
    //
    //     const inputs = [
    //         {
    //             name: 'my_file',
    //             type: 'file'
    //         },
    //         {
    //             name: 'nick',
    //             placeholder: me.nick
    //         },
    //         {
    //             name: 'password',
    //             type: 'password',
    //             placeholder: 'Password'
    //         },
    //         {
    //             name: 'password_repeat',
    //             type: 'password',
    //             placeholder: 'Repeat Password'
    //         },
    //         {
    //             name: 'submit',
    //             type: 'submit',
    //             value: 'Submit'
    //         }
    //     ];
    //     const formObj = new Form();
    //     const form = formObj.render({ inputs: inputs, formId: 'profileForm' })
    //     formblock.appendChild(form);
    //
    //     const pLink = document.createElement('p');
    //     form.appendChild(pLink);
    //
    //     const link = createLinkMenu();
    //     pLink.appendChild(link);
    //
    //
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

const buttons = {
    'signin': createSignIn,
    'signup': createSignUp,
    'leaders': createLeaders,
    'profile': createProfile,
    'about': createAbout,
    'menu': createMenu,
};

root.addEventListener("click", function (event) {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    event.preventDefault();

    const target = event.target;
    //const href = target.dataset.href;
    const eventName = target.name;

    root.innerHTML = '';
    buttons[eventName]();
//
});

createMenu();