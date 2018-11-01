'use strict'

const httpRequest = window.httpModule

const root = document.getElementById('root')

function createMenu () {
  const menuHtml = window.menuTemplate()
  root.innerHTML = menuHtml
}

function createSignIn () {
  httpRequest.doGet({
    url: 'http://127.0.0.1:8080/islogged',

    callback (res) {
      if (res.status === 200) {
        alert('You already authorized')
        createMenu()
      } else {

      }
    }
  })

  const signinHtml = window.signinTemplate()
  root.innerHTML = signinHtml

  const form = document.getElementById('signinForm')

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const email = form.elements['email'].value
    const password = form.elements['password'].value

    const JSONdata = {
      'email': email,
      'password': password
    }

    httpRequest.doPost({
      url: 'http://127.0.0.1:8080/signin',
      contentType: 'application/json',
      data: JSONdata,

      callback (res) {
        if (res.status === 400) {
          alert('Wrong login or password')
          return
        }
        if (res.status === 500) {
          alert('Server error')
        }
        if (res.status === 200) {
          alert('You are log in!')
          createProfile()
        }
      }
    })
  })
}

function createSignUp () {
  httpRequest.doGet({
    url: 'http://127.0.0.1:8080/islogged',
    callback (res) {
      if (res.status === 200) {
        alert('You are already authorized')
        createMenu()
      } else { }
    }
  })

  const signupHtml = window.signupTemplate()
  root.innerHTML = signupHtml

  const form = document.getElementById('signupForm')

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const firstname = form.elements['firstname'].value
    const lastname = form.elements['lastname'].value
    const age = form.elements['age'].value
    const nickname = form.elements['nickname'].value
    const email = form.elements['email'].value
    const password = form.elements['password'].value
    const repeatPassword = form.elements['repeatPassword'].value

    if (password !== repeatPassword) {
      alert('Passwords is not equals')
      return
    } else if (email === '') {
      alert('Enter email!')
      return
    }

    const JSONdata = {
      'name': firstname,
      'last_name': lastname,
      'age': age,
      'nick': nickname,
      'email': email,
      'password': password
    }

    httpRequest.doPost({
      url: 'http://127.0.0.1:8080/signup',
      data: JSONdata,
      contentType: 'application/json',

      callback (res) {
        console.log(res.status)
        if (res.status > 300) {
          alert('You already register')
          createMenu()
        } else if (res.status === 208) {
          alert('Email already exist')
        } else if (res.status === 400) {
          alert('Something is wrong')
        } else if (res.status === 409) {
          alert('StatusConflict')
        } else {
          createProfile()
        }
      }
    })
  })
}

function createScoreboard () {
  let pagesCount, inputPlayers
  // Заправшиваем кол-во страниц с игроками
  httpRequest.doGet({
    url: 'http://127.0.0.1:8080/askForPlayersCount',
    callback (res) {
      if (res.status > 300) {
        alert('Something wrong')
        createMenu()
        return
      }
      res.then(function (data) {
        pagesCount = data
      })
    }
  })
  // Заправшиваем игроков
  httpRequest.doGet({
    url: 'http://127.0.0.1:8080/askForPlayers',
    callback (res) {
      if (res.status > 300) {
        alert('Something wrong')
        createMenu()
        return
      }
      res.json().then(function (data) {
        inputPlayers = data
      })
    }
  })

  // Индекс актвиной страницы при первом открытии старницы слидерами
  const index = 1

  const scoreboardHtml = window.scoreboardTemplate({ index, pagesCount, inputPlayers })
  root.innerHTML = scoreboardHtml

  const pagination = document.getElementById('pagination')

  pagination.addEventListener('click', function (event) {
    event.preventDefault()

    const target = event.target
    const pageName = target.name
    // Приводим к числу имя страницы
    // const intPageName = parseInt(pageName, 10);

    // Отправляем индекс страницы на бэк и получаем новых лидеров
    httpRequest.doGet({
      url: 'http://127.0.0.1:8080/leaders',
      data: pageName,

      callback (res) {
        if (res.status > 300) {
          console.log('Something wrong')
          createMenu()
          return
        }
        // Отрисовываем новых лидеров
        res.json().then(function (playersData) {
          const scoreboardHtml = window.scoreboardTemplate({ pageName, pagesCount, playersData })
          root.innerHTML = scoreboardHtml
        })
      }
    })
  })
}

function createProfile (me) {
  var playerNickname

  httpRequest.doGet({
    url: 'http://127.0.0.1:8080/islogged',
    callback (res) {
      if (res.status === 400) {
        alert('Please login')
        createSignIn()
      }
    }
  })
  // Запрашиваем никнейм пользователя для отображения
  httpRequest.doGet({
    url: 'http://127.0.0.1:8080/usernickname',
    callback (res) {
      if (res.status > 300) {
        alert('Something wrong')
        createMenu()
        return
      }
      res.json().then(function (data) {
        playerNickname = data
        console.warn(playerNickname)
      })
    }
  })

  const profileHtml = window.profileTemplate({ playerNickname })
  root.innerHTML = profileHtml

  if (me) {
    const form = document.getElementById('profileForm')
    form.addEventListener('submit', function (event) {
      event.preventDefault()

      const newPassword = form.elements['newpassword'].value
      const repeatNewPassword = form.elements['repeatnewpassword'].value
      const newNickname = form.elements['newnickname'].value

      var avatarformData = new FormData(form.elemnts['newavatar'])

      if (newPassword !== repeatNewPassword) {
        alert('Password are not equal')
        createProfile()
        return
      }

      const JSONdata = {
        'password': newPassword,
        'nickname': newNickname
      }

      // Смена пароля пользователем
      httpRequest.doPut({
        url: 'http://127.0.0.1:8080/changepass',
        data: JSONdata,
        contentType: 'application/json',
        callback (res) {
          if (res.status > 300) {
            alert('Something was wrong')
          }
        }
      })

      httpRequest.doPost({
        url: 'http://127.0.0.1:8080/changeuserdata',
        data: avatarformData,
        contentType: 'multipart/form-data',
        callback (res) {
          if (res.status > 300) {
            alert('Something was wrong')
            return
          }
          res.json().then(function (data) {
            imgSrc = data
            const profileHtml = window.profileTemplate({ imgSrc, playerNickname })
            root.innerHTML = profileHtml
          })
        }
      })
    })
  } else {
    httpRequest.doGet({
      url: 'http://127.0.0.1:8080/profile',

      callback (res) {
        console.log(res.status)
        if (res.status > 300) {
          alert('Unauthorized')
          createMenu()
          return
        }
        res.json().then(function (user) {
          createProfile(user)
        })
      }
    })
  }
}

function createAbout () {
  const aboutHtml = window.aboutTemplate()
  root.innerHTML = aboutHtml
}

const menuButtons = {
  'signin': createSignIn,
  'signup': createSignUp,
  'leaders': createScoreboard,
  'profile': createProfile,
  'about': createAbout,
  'menu': createMenu
}

root.addEventListener('click', function (event) {
  if (!(event.target instanceof HTMLAnchorElement)) return
  event.preventDefault()

  const target = event.target
  const eventName = target.name
  menuButtons[eventName]()
})

createMenu()
