// const URL = "http://172.28.0.202:8000/";
// const URLuserMe = "http://172.28.0.202:8000/";
// const URLuserMe = "http://192.168.1.5:8000/";
const URLuserMe = "http://192.168.0.199:8000/";

const tokenMe = "auth/me";

const infoOnline = document.querySelector(".profile-photo");
const profileForm = document.querySelector(".profile");
const profileContainer = document.querySelector(".profile-info");
const isActiveBox = document.querySelector(".is-active");
const onlineBox = document.querySelector(".offline");
const textInfoOnline = document.querySelector(".online-text");
const textInfoOffline = document.querySelector(".offline-text");
const profileBtn = document.querySelector(".profile-user-btn");
const container = document.querySelector(".container-profile");

const userPhoto = document.querySelector(".image-user");


const urlBear = "https://drasler.ru/wp-content/uploads/2019/05/%D0%9A%D1%80%D1%83%D1%82%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%BD%D0%B0-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D1%83-%D1%8F-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-024.jpg";
const urlBmw = "https://avatarzo.ru/wp-content/uploads/sportivnyj-bmw.jpg";
const urlCat = "https://omoro.ru/wp-content/uploads/2018/05/prikilnie-kartinki-na-avatarky-dlia-devyshek-48.jpg";
const urlPolarBear = 'https://i.pinimg.com/originals/8a/de/fe/8adefe5af862b4f9cec286c6ee4722cb.jpg';
const photoBox = document.querySelector(".photo");
const choseContainer = document.querySelector(".chose");
photoBox.style.backgroundImage = `url(${urlPolarBear})`;
let tok;
let email;
let urlPhoto;
let totalUrlPhoto;
// const nickName = document.querySelector('.nickname');


// const headers = new Headers();
// headers.append("accept","application/json");

// const tokData = JSON.parse(localStorage.getItem("tokens"));
// console.log(tokData);
// const tok = tokData.token_type;
// console.log(tok);

// headers.append("Authorization",`Bearer ${tok}`);

const saveProfilePhoto = () => {
    let dataInfo = {
        "url" : totalUrlPhoto
    }
    localStorage.setItem("profilePhoto", JSON.stringify(dataInfo))
}

const openChoseBox = (e) => {
    e.preventDefault();
    const target = e.target;
    if(target.closest(".photo")) {
        choseContainer.classList.toggle("none-text");
    }
}

const changePhoto = (e) => {
    
    e.preventDefault();
    const target = e.target;
    if(target.closest(".bear")) {
        photoBox.style.backgroundImage = `url(${urlBear})`;
        userPhoto.style.backgroundImage = `url(${urlBear})`;
        totalUrlPhoto = urlBear;
        saveProfilePhoto();
        choseContainer.classList.toggle("none-text");
    }
    if(target.closest(".bmw")) {
        photoBox.style.backgroundImage = `url(${urlBmw})`;
        userPhoto.style.backgroundImage = `url(${urlBmw})`;
        totalUrlPhoto = urlBmw;
        saveProfilePhoto();
        choseContainer.classList.toggle("none-text");
    }
    if(target.closest(".cat")) {
        photoBox.style.backgroundImage = `url(${urlCat})`;
        userPhoto.style.backgroundImage = `url(${urlCat})`;
        totalUrlPhoto = urlCat;
        saveProfilePhoto(); 
        choseContainer.classList.toggle("none-text");
    }
    if(target.closest(".polar-bear")) {
        photoBox.style.backgroundImage = `url(${urlPolarBear})`;
        userPhoto.style.backgroundImage = `url(${urlPolarBear})`;
        totalUrlPhoto = urlPolarBear;
        saveProfilePhoto(); 
        choseContainer.classList.toggle("none-text");
    }
}


const getData = async(URL) => {
    const tokData = JSON.parse(localStorage.getItem("tokens"));
    const tok = tokData.token_type;
    const headers = new Headers({
        "Authorization": `Bearer ${tok}`,
        "Accept": "application/json"
    });
    const response = await fetch(URL, {
        method: "GET",
        headers: headers
    })
    try {
        return await response.json();        
    }
    catch(err) {
        console.error("Error", err, response.status)
    }
}

// const dataProf = await getData()

const closeModalCart = (e) => {
    const target = e.target;
    const modalContent = target.closest(".profile");
    if(!modalContent) {
        container.classList.add("none-text");
        profileContainer.textContent = "";
        profileBtn.style.opacity = '1';

    }
}

const createProfileCard = ({id, email}) => {
    const profileCard = `
        <h3>Your id: <span class="my-id">${id}</span></h3>
        <div class="line"></div>
        <h3>Your email: ${email}</h3>
        <div class="line"></div>
    `;
    profileContainer.insertAdjacentHTML("beforeend", profileCard);
}

const getProfileData = (e) => {
    getData(URLuserMe + tokenMe)
    .then((response) => {
            createProfileCard(response);
            // console.log(response);
            container.classList.remove("none-text");
            
        
        if(response.is_active) {
            textInfoOnline.classList.remove("none-text")
            textInfoOnline.classList.add("active-text");
            onlineBox.classList.remove("none-text");
            onlineBox.classList.remove("offline");
            onlineBox.classList.add("active-text");
            onlineBox.classList.add("online");
        } 
    })
}


container.addEventListener("click", closeModalCart);
profileBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    profileBtn.style.opacity = '0.4';


    const allUsersBtn = document.querySelector('.all-users');
    const chatsListBtn = document.querySelector('.chats-list-btn');
    const settingsBtn = document.querySelector('.settings')
    const exitBtn = document.querySelector('.exit-btn')

    allUsersBtn.style.opacity = '1';
    chatsListBtn.style.opacity = '1';
    settingsBtn.style.opacity = '1';
    exitBtn.style.opacity = '1'

    await getProfileData();
})

photoBox.addEventListener("click", openChoseBox);
choseContainer.addEventListener("click", changePhoto);


// window.addEventListener("DOMContentLoaded", () => {
//     const localPhoto = JSON.parse(localStorage.getItem("profilePhoto"))
//     if(localPhoto) {
//         const localUrl = localPhoto.url;
//         photoBox.style.backgroundImage = `url(${localUrl})`;
//         userPhoto.style.backgroundImage = `url(${localUrl})`
//     }
// })

