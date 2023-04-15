// http://172.28.0.202:8000/docs

const btnLogIn = document.querySelector(`.btn-login`)
const btnAuto = document.querySelector(`.btn-auto`)
const logBtn = document.getElementById(`log-btn`)
const containerAb = document.querySelector('.cont-btns')
const containerGal = document.querySelector('.main-container')
const nickName = document.querySelector('.nickname');
const emailLog = document.querySelector(`#emaill`)
const pswLog = document.querySelector(`#psww`);
const containerReg = document.querySelector('.wrapper-form-registr');
const goodAuto = document.querySelector('.good-autorization');
const infoReg = document.querySelector('.info-registr');
const badLogin = document.querySelector('.bad-login');
const formLoginInputs = document.querySelector('.form-login');
const emailReg = document.querySelector(`#email`);
const pswReg = document.querySelector(`#psw`);

// const url = `http://172.28.0.202:8000`
// const url = "http://192.168.1.5:8000/";
// const url = "http://172.28.0.202:8000/";
const url = "http://192.168.0.199:8000/";

const endPointAuthLog = 'auth/login';
const endPointAuthRegistr = 'auth/register';


const formCont = document.querySelector(`.form-cont`)
const formAuto = document.querySelector(`#formcont`)

const formLogIn = document.querySelector(`#formlogin`)

btnLogIn.addEventListener(`click`, (e) => {
    e.preventDefault()
    formAuto.style.display = `none`;
    formLogIn.style.display = `block`;
    infoReg.style.display = 'none'
    // console.log(emailLog.value);
    badLogin.style.display = 'none';
    formLoginInputs.style.display = `flex`;
    emailLog.value = '';
    pswLog.value = '';
})


logBtn.addEventListener(`click`, async (e) => {
    e.preventDefault()
    // const URL = `http://172.28.0.202:8000/auth/login`
    // const URL = `http://192.168.1.6:8000/auth/login`

    // const emailLog = document.querySelector(`#emaill`)
    // const pswLog = document.querySelector(`#psww`)
    // console.log(emailLog.value, pswLog.value);

    await fetch(url + endPointAuthLog, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json'
        },
        body: `grant_type=&username=${emailLog.value}&password=${pswLog.value}&scope=&client_id=&client_secret=`

    })
    .then(response => {
        if(response.status == 200) {
            // console.log('ok');
            const exitBtn = document.querySelector('.exit-btn');
            containerReg.style.display = 'none';
            containerGal.style.display = 'block';
            exitBtn.style.opacity = '1'

        } 
        return response.json()

    })
    .then(d => {
        console.log(d);
        if(d.access_token) {
            let date = new Date();
            let dataInfo = {
                "token_type" : d.access_token,
                "email" : `${emailLog.value}`,
                'minute': `${date.getTime()}`
            }
            localStorage.setItem("tokens", JSON.stringify(dataInfo))
            nickName.textContent = `${dataInfo.email}`
            emailLog.value = '';
            pswLog.value = '';
            formLogIn.style.display = `none`;
            formAuto.style.display = `none`;
            // console.log(date.getMinutes());            
        } else {
            badLogin.style.display = 'block';
            formLoginInputs.style.display = `none`;
        }


        // console.log(d);
        // localStorage.setItem(`${emailLog.value}`, JSON.stringify(d.access_token))
        
    })
    .catch(e => {
        console.log(e);
    })

    // Добавил, чтобы сохранял мой айди
    await fetch(url + 'auth/me', {
        method: "GET",
        headers: {
            'accept': 'application/json',
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('tokens')).token_type}`,
        },
    })
    .then(response => response.json())
    .then(data => localStorage.setItem('myID', data.id))
})


btnAuto.addEventListener(`click`, (e) => {
    e.preventDefault();
    formAuto.style.display = `block`;
    formLogIn.style.display = `none`;
    infoReg.style.display = 'none'
    goodAuto.classList.add('passive');
    formCont.style.display = 'flex';
    emailReg.value = '';
    pswReg.value = '';
})

const regBtn = document.getElementById(`reg-btn`)


regBtn.addEventListener(`click`, (e) => {
    // const DOMEN = `http://172.28.0.202:8000/auth/register`
    // const DOMEN = `http://192.168.1.6:8000/auth/register`
    e.preventDefault()
    const emailReg = document.querySelector(`#email`)
    const pswReg = document.querySelector(`#psw`)

    fetch(url + endPointAuthRegistr, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "email": emailReg.value,
                "password": pswReg.value,
                "is_active": true,
                "is_superuser": false,
                "is_verified": false,
                "username": emailReg.value
            }
        )
    })
        .then(response => {
            goodAuto.classList.remove('passive')
            formCont.style.display = `none`;

            return response.json()
        })
        .then(d => {
            console.log(d);
        })
        .catch((e) => {
            console.log(e);
        })
})
