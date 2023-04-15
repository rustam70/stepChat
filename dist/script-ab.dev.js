"use strict";

// http://172.28.0.202:8000/docs
var btnLogIn = document.querySelector(".btn-login");
var btnAuto = document.querySelector(".btn-auto");
var logBtn = document.getElementById("log-btn");
var containerAb = document.querySelector('.cont-btns');
var containerGal = document.querySelector('.main-container');
var nickName = document.querySelector('.nickname');
var emailLog = document.querySelector("#emaill");
var pswLog = document.querySelector("#psww");
var containerReg = document.querySelector('.wrapper-form-registr');
var goodAuto = document.querySelector('.good-autorization');
var infoReg = document.querySelector('.info-registr');
var badLogin = document.querySelector('.bad-login');
var formLoginInputs = document.querySelector('.form-login');
var emailReg = document.querySelector("#email");
var pswReg = document.querySelector("#psw"); // const url = `http://172.28.0.202:8000`
// const url = "http://192.168.1.5:8000/";

var url = "http://172.28.0.202:8000/";
var endPointAuthLog = 'auth/login';
var endPointAuthRegistr = 'auth/register';
var formCont = document.querySelector(".form-cont");
var formAuto = document.querySelector("#formcont");
var formLogIn = document.querySelector("#formlogin");
btnLogIn.addEventListener("click", function (e) {
  e.preventDefault();
  formAuto.style.display = "none";
  formLogIn.style.display = "block";
  infoReg.style.display = 'none'; // console.log(emailLog.value);

  badLogin.style.display = 'none';
  formLoginInputs.style.display = "flex";
  emailLog.value = '';
  pswLog.value = '';
});
logBtn.addEventListener("click", function (e) {
  e.preventDefault(); // const URL = `http://172.28.0.202:8000/auth/login`
  // const URL = `http://192.168.1.6:8000/auth/login`
  // const emailLog = document.querySelector(`#emaill`)
  // const pswLog = document.querySelector(`#psww`)
  // console.log(emailLog.value, pswLog.value);

  fetch(url + endPointAuthLog, {
    method: "POST",
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded' // 'Content-Type': 'application/json'

    },
    body: "grant_type=&username=".concat(emailLog.value, "&password=").concat(pswLog.value, "&scope=&client_id=&client_secret=")
  }).then(function (response) {
    if (response.status == 200) {
      // console.log('ok');
      var exitBtn = document.querySelector('.exit-btn');
      containerReg.style.display = 'none';
      containerGal.style.display = 'block';
      exitBtn.style.opacity = '1';
    }

    return response.json();
  }).then(function (d) {
    console.log(d);

    if (d.access_token) {
      var date = new Date();
      var dataInfo = {
        "token_type": d.access_token,
        "email": "".concat(emailLog.value),
        'minute': "".concat(date.getTime())
      };
      localStorage.setItem("tokens", JSON.stringify(dataInfo));
      nickName.textContent = "".concat(dataInfo.email);
      emailLog.value = '';
      pswLog.value = '';
      formLogIn.style.display = "none";
      formAuto.style.display = "none"; // console.log(date.getMinutes());            
    } else {
      badLogin.style.display = 'block';
      formLoginInputs.style.display = "none";
    } // console.log(d);
    // localStorage.setItem(`${emailLog.value}`, JSON.stringify(d.access_token))

  })["catch"](function (e) {
    console.log(e);
  });
});
btnAuto.addEventListener("click", function (e) {
  e.preventDefault();
  formAuto.style.display = "block";
  formLogIn.style.display = "none";
  infoReg.style.display = 'none';
  goodAuto.classList.add('passive');
  formCont.style.display = 'flex';
  emailReg.value = '';
  pswReg.value = '';
});
var regBtn = document.getElementById("reg-btn");
regBtn.addEventListener("click", function (e) {
  // const DOMEN = `http://172.28.0.202:8000/auth/register`
  // const DOMEN = `http://192.168.1.6:8000/auth/register`
  e.preventDefault();
  var emailReg = document.querySelector("#email");
  var pswReg = document.querySelector("#psw");
  fetch(url + endPointAuthRegistr, {
    method: "POST",
    headers: {
      'accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": emailReg.value,
      "password": pswReg.value,
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": emailReg.value
    })
  }).then(function (response) {
    goodAuto.classList.remove('passive');
    formCont.style.display = "none";
    return response.json();
  }).then(function (d) {
    console.log(d);
  })["catch"](function (e) {
    console.log(e);
  });
});