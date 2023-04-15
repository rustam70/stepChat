// const chatBtn = document.querySelector('#chat');

// http://192.168.0.199:8000/docs#/default
// http://192.168.1.5:8000/docs#/default

document.addEventListener('DOMContentLoaded', async function() {
const settingsBtn = document.querySelector('.settings');
const modalWindowSettings = document.querySelector('.wrapper-colors-settings')
const redTheme = document.querySelector('#red-theme');
const blueTheme = document.querySelector('#blue-theme');
const greenTheme = document.querySelector('#green-theme');
const opacityTheme = document.querySelector('#opacity-theme');
const redChat = document.querySelector('#red-chat');
const blueChat = document.querySelector('#blue-chat');
const greenChat = document.querySelector('#green-chat');
const opacityChat = document.querySelector('#opacity-chat');
const redFont = document.querySelector('#red-font');
const blueFont = document.querySelector('#blue-font');
const greenFont = document.querySelector('#green-font');
const opacityFont = document.querySelector('#opacity-font');
const chatBackGround = document.querySelectorAll('.chat-background');
const anyText = document.querySelector('.any-text');
const chat = document.querySelector('.chat');
const currentChat = document.querySelector('.current-chat');
const formData = document.querySelector('.form-data');
const allUsersBtn = document.querySelector('.all-users');
const profileBtn = document.querySelector('.profile-user-btn');
const nickNameLoad = document.querySelector('.nickname');
const chatsContent = document.querySelector('.chats-content');
const exitBtn = document.querySelector('.exit-btn');
const mainContainer = document.querySelector('.main-container');
const footerChat = document.querySelector('.footer');
const containerReg = document.querySelector('.wrapper-form-registr');
const allUsersContent = document.querySelector('.all-users-content');
const chatsListBtn = document.querySelector('.chats-list-btn');
const infoRegistr = document.querySelector('.info-registr');
const allUsersContentDouble = document.querySelector('.all-users-content-double');
const searchUsers = document.querySelector('.search-users');
const searchChats = document.querySelector('.search-chats');
const btnSearchInInput = document.querySelector('#btn-search-users');
const btnSearchInInputChats = document.querySelector('#btn-search-chats');
const searchInput = document.querySelector('#nickname-users-search-input');
const searchInputChats = document.querySelector('#nickname-chats-search-input');
const userNotFound = document.querySelector('.user-not-found');
let limit = 20;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2ODExMzQ5MTB9.2wJ_EthnebiQHCi6X5D7kpumh-PHVXxOdPzcgmvmges';
//настройки цвета
let objColorsTheme = {
    red: '',
    green: '',
    blue: '',
    opacity: ''
};
let objColorsFont = {
    red: '',
    green: '',
    blue: '',
    opacity: ''
};
let objColorsChat = {
    red: '',
    green: '',
    blue: '',
    opacity: ''
};

const endPointMyInfo = 'auth/me';
const endPointOwnChats = 'chat/my';
// let myId = '';
// let myEmail = '';

const urlBasic = 'http://192.168.0.199:8000/'
// const urlBasic = 'http://192.168.1.5:8000/'
const getDataMyInfo = async(url, endPoint) => {
    const tokDataOwnChats = JSON.parse(localStorage.getItem("tokens"));
    const tokOwnChats = tokDataOwnChats.token_type;
    const headersOwnChats = new Headers({
        "Authorization": `Bearer ${tokOwnChats}`,
        "Accept": "application/json"
    });
    const response = await fetch(url + endPoint, {
        method: "GET",
        headers: headersOwnChats
    })
    try {
        // let data = await response.json();
        // myId = data.id;
        // myEmail = data.email;
        // console.log(data);
        return await response.json();   
    }
    catch(err) {
        console.error("Error", err, response.status)
    }
}

// const myParams = await getDataMyInfo(urlBasic, endPointMyInfo);
// console.log(myParams);
// let myId = myParams.id;
// let myEmail = myParams.email;


//создание карточек пользователей, отображается слева, можно переключать на мои чаты
const renderUsers = ({username, id, email, is_active}) => {
    let borderLeft;
    if(is_active) {
        borderLeft = '#2f6c1b96';
    } else {
        borderLeft = '#741111ad';
    }
    const cardUser = `
        <div class="one-user-container" title="${email}"  id="${id}" style="border-left: 5px solid ${borderLeft}">            
            <div class="email-user">
                <div class="username-user">Username: <span class="one-user-username">${username}</span></div>
                <div class="email-user-string">Email: <span class="one-user-email">${email}</span></div>
            </div>            
        </div>
    `;
    allUsersContentDouble.insertAdjacentHTML('beforeend', cardUser)
}
const eachUsers = (data) => {
    chatsContent.textContent = '';
    data.forEach(element => {
        renderUsers(element);
    });
}

//создание карточек чатов, можно переключать на всех пользователей, расположение - слева
const renderCahts = async ({id, to_user, from_user}) => {
    const dataOwnChatsMe = await getDataMyInfo(urlBasic, endPointMyInfo);  
    let borderLeft;  
    if(to_user.id == dataOwnChatsMe.id) {
        to_user.is_active == true ? borderLeft = '#2f6c1b96' : borderLeft = '#741111ad';
        const cardUserF = `
        <div class="wrapper-email-chat" id="${id}">
            <div class="email-chat" style="border-left: 5px solid ${borderLeft}"">${from_user.email}</div>
        </div>
        `;
        chatsContent.insertAdjacentHTML('beforeend', cardUserF)
    } else if(from_user.id == dataOwnChatsMe.id){
        from_user.is_active == true ? borderLeft = '#2f6c1b96' : borderLeft = '#741111ad';
        const cardUserT = `
            <div class="wrapper-email-chat" id="${id}">
                <div class="email-chat" style="border-left: 5px solid ${borderLeft}"">${to_user.email}</div>
            </div>
        `;
        chatsContent.insertAdjacentHTML('beforeend', cardUserT)

    }
}
const eachChat = async (data) => {
    allUsersContentDouble.textContent = '';
    chatsContent.textContent = '';
    data.chats.forEach((elem) => {
        renderCahts(elem)
    })
}

//найстройки цвета, чтобы не пропадала выбранная цветовая тема после обновления
const showLocalStorage = () => {
    let dataTheme = JSON.parse(localStorage.getItem('objColorsTheme'));
    let dataFont = JSON.parse(localStorage.getItem('objColorsFont'));
    let dataChat = JSON.parse(localStorage.getItem('objColorsChat'));

    if(dataTheme) {
        chatBackGround.forEach((elem) => {
            elem.style.backgroundColor = `rgba(${dataTheme.red}, ${dataTheme.green}, ${dataTheme.blue}, ${dataTheme.opacity / 10})`;
        })
        formData.style.backgroundColor = `rgba(${dataTheme.red}, ${dataTheme.green}, ${dataTheme.blue}, ${dataTheme.opacity / 10})`;
        currentChat.style.borderRight = `1px solid rgba(${dataTheme.red}, ${dataTheme.green}, ${dataTheme.blue}, ${dataTheme.opacity / 10})`;        
        footerChat.style.backgroundColor = `rgba(${dataTheme.red}, ${dataTheme.green}, ${dataTheme.blue}, ${dataTheme.opacity / 10})`;
    }

    if(dataFont) {
        anyText.style.color = `rgba(${dataFont.red}, ${dataFont.green}, ${dataFont.blue}, ${dataFont.opacity / 10})`;
        chat.style.color = `rgba(${dataFont.red}, ${dataFont.green}, ${dataFont.blue}, ${dataFont.opacity / 10})`
    }

    if(dataChat) {
        currentChat.style.backgroundColor = `rgba(${dataChat.red}, ${dataChat.green}, ${dataChat.blue}, ${dataChat.opacity / 10})`
        chatsContent.style.backgroundColor = `rgba(${dataChat.red}, ${dataChat.green}, ${dataChat.blue}, ${dataChat.opacity / 10})`
        allUsersContent.style.backgroundColor = `rgba(${dataChat.red}, ${dataChat.green}, ${dataChat.blue}, ${dataChat.opacity / 10})`
    }
}
showLocalStorage();

//открыть настройки, модалка
const showSettings = () => {
    modalWindowSettings.classList.remove('passive');
}

//события на смену цвета
const mouseMove = () => {
    chatBackGround.forEach((elem) => {
        elem.style.backgroundColor = `rgba(${redTheme.value}, ${greenTheme.value}, ${blueTheme.value}, ${opacityTheme.value / 10})`;
    })
    formData.style.backgroundColor = `rgba(${redTheme.value}, ${greenTheme.value}, ${blueTheme.value}, ${opacityTheme.value / 10})`;
    currentChat.style.borderRight = `1px solid rgba(${redTheme.value}, ${greenTheme.value}, ${blueTheme.value}, ${opacityTheme.value / 10 * 2})`
    footerChat.style.backgroundColor = `rgba(${redTheme.value}, ${greenTheme.value}, ${blueTheme.value}, ${opacityTheme.value / 10})`;
    objColorsTheme.red = redTheme.value;
    objColorsTheme.green = greenTheme.value;
    objColorsTheme.blue = blueTheme.value;
    objColorsTheme.opacity = opacityTheme.value;

    return `rgba(${redTheme.value}, ${greenTheme.value}, ${blueTheme.value}, ${opacityTheme.value / 10})`;
}
const mouseMoveColors = (foo) => {
    document.addEventListener('mousemove', (foo));
    document.addEventListener('mouseup', () => {
        localStorage.setItem('objColorsTheme', JSON.stringify(objColorsTheme));
        document.removeEventListener('mousemove', (foo));
    })
}
const mouseDown = (e) => {
    let target = e.target;
    if(target.closest('#red-theme') || target.closest('#blue-theme') || target.closest('#green-theme') || target.closest('#opacity-theme')) {
        mouseMoveColors(mouseMove);
    }
}
document.addEventListener('mousedown', (event) => {
    mouseDown(event);
});

const mouseMoveFont = () => {
    anyText.style.color = `rgba(${redFont.value}, ${greenFont.value}, ${blueFont.value}, ${opacityFont.value / 10})`;
    chat.style.color = `rgba(${redFont.value}, ${greenFont.value}, ${blueFont.value}, ${opacityFont.value / 10})`
    objColorsFont.red = redFont.value;
    objColorsFont.green = greenFont.value;
    objColorsFont.blue = blueFont.value;
    objColorsFont.opacity = opacityFont.value;
}
const mouseMoveColorsFont = (foo) => {
    document.addEventListener('mousemove', (foo));
    document.addEventListener('mouseup', () => {
        localStorage.setItem('objColorsFont', JSON.stringify(objColorsFont));
        document.removeEventListener('mousemove', (foo));
    })
}
const mouseDownFont = (e) => {
    let target = e.target;
    if(target.closest('#red-font') || target.closest('#blue-font') || target.closest('#green-font') || target.closest('#opacity-font')) {
        mouseMoveColorsFont(mouseMoveFont);
    }
}
document.addEventListener('mousedown', (event) => {
    mouseDownFont(event);
});
const mouseMoveChat = () => {
    currentChat.style.backgroundColor = `rgba(${redChat.value}, ${greenChat.value}, ${blueChat.value}, ${opacityChat.value / 10})`;
    chatsContent.style.backgroundColor = `rgba(${redChat.value}, ${greenChat.value}, ${blueChat.value}, ${opacityChat.value / 10})`;
    allUsersContent.style.backgroundColor = `rgba(${redChat.value}, ${greenChat.value}, ${blueChat.value}, ${opacityChat.value / 10})`;
    objColorsChat.red = redChat.value;
    objColorsChat.green = greenChat.value;
    objColorsChat.blue = blueChat.value;
    objColorsChat.opacity = opacityChat.value;
}
const mouseMoveColorsChat = (foo) => {
    document.addEventListener('mousemove', (foo));
    document.addEventListener('mouseup', () => {
        localStorage.setItem('objColorsChat', JSON.stringify(objColorsChat));
        document.removeEventListener('mousemove', (foo));
    })
}
const mouseDownChat = (e) => {
    let target = e.target;
    if(target.closest('#red-chat') || target.closest('#blue-chat') || target.closest('#green-chat') || target.closest('#opacity-chat')) {
        mouseMoveColorsChat(mouseMoveChat);
    }
}
document.addEventListener('mousedown', (event) => {
    mouseDownChat(event);
});

//скрыть настройки
const hideSettings = (e) => {
    const target = e.target;
    const closeBtn = target.closest('.close-settings-btn');
    const modalContent = target.closest('.forms');
    if(closeBtn || !modalContent) {
        modalWindowSettings.classList.add('passive');
        settingsBtn.style.opacity = '1';

    }
}
//показать всех юзеров
const showAllUsers = async (e) => {
    userNotFound.classList.add('passive')
    searchInput.value = '';
    allUsersContentDouble.textContent = '';
    chatsContent.textContent = '';
    searchUsers.classList.remove('passive');
    searchChats.classList.add('passive')
    allUsersContent.classList.remove('passive');
    chatsContent.classList.add('passive');
    const getInfo = async () => {
        const req = await fetch('http://192.168.0.199:8000/auth/users/?skip=0&limit=100', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        return await req.json();
    }
    const dataUsers = await getInfo();
    eachUsers(dataUsers.users);
}

const showOwnChats = async (e) => {
    searchUsers.classList.add('passive');
    searchChats.classList.remove('passive');
    chatsContent.classList.remove('passive');
    allUsersContent.classList.add('passive');
    const dataUsers = await getDataMyInfo(urlBasic, endPointOwnChats);
    eachChat(dataUsers)
}

// const populate = async () => {
//     while(true) {
//       let windowRelativeBottom = allUsersContent.getBoundingClientRect().bottom;
//         if (windowRelativeBottom > allUsersContent.clientHeight + 200) {
//             limit += 20;
//             const getInfo = async () => {
//                 const req = await fetch(`http://192.168.0.199:8000/auth/users/?skip=0&limit=${limit}`, {
//                     method: 'GET',
//                     headers: {
//                         'Accept': 'application/json',
//                     }
//                 });
//                 return await req.json();
//             }
//             const dataUsers = await getInfo();
//             dataUsers.users.forEach((elem) => {
//                 console.log(indexOf(elem));
//                     // userNotFound.classList.add('passive')
//                     // allUsersContentDouble.textContent = '';
//                     // renderUsers(elem);
//             })
//             break;
//         }
//     }
// }


// const getLogOut = async () => {
//     const req = await fetch('http://192.168.1.5:8000/auth/logout', {
//         method: 'POST',
//         headers: {
//             'accept': 'application/json'
//         },
//         body: '',
//     })
//     return await req.json();
// }

const exitEvent = (e) => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('myID');
    containerReg.style.display = 'flex';
    mainContainer.style.display = 'none';
    infoRegistr.style.display = 'flex';
}

const tokenVerification = () => {
    let date = JSON.parse(localStorage.getItem('tokens'));
    if(date) {
        let dateMinute = +date.minute;
        let newDate = new Date();
        if(dateMinute + 4800000 < newDate.getTime()) {
            localStorage.removeItem('tokens');
            containerReg.style.display = 'flex';
            mainContainer.style.display = 'none';
            infoRegistr.style.display = 'flex';
        }
    }
}
setInterval(() => {
    tokenVerification()
}, 5000)

const searchUsersFoo = async () => {
    let value = searchInput.value;
    const getInfo = async () => {
        const req = await fetch('http://192.168.0.199:8000/auth/users/?skip=0&limit=20', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        return await req.json();
    }
    const dataUsers = await getInfo();
    let identif = false;
    dataUsers.users.forEach((elem) => {
        if(elem.email.toLowerCase() === value.toLowerCase()) {
            console.log('усть');
            userNotFound.classList.add('passive')
            allUsersContentDouble.textContent = '';
            renderUsers(elem);
            identif = true;
            return identif;
        } 
    })
    if(!identif) {
        console.log('hh');
        allUsersContentDouble.textContent = '';
        userNotFound.classList.remove('passive');
    }
}

const searchChatsFoo = async () => {
    let value = searchInputChats.value;
    const dataUsersNew = await getDataMyInfo(urlBasic, endPointOwnChats);
    const dataOwnChatsMe = await getDataMyInfo(urlBasic, endPointMyInfo);
    chatsContent.textContent = '';

    dataUsersNew.chats.forEach((elem) => {
        let fromUserId = elem.from_user.id;
        let toUserId = elem.to_user.id;
        if(elem.to_user.email.toLowerCase() == value.toLowerCase() || elem.from_user.email.toLowerCase() == value.toLowerCase()) {
            chatsContent.textContent = '';
            if(toUserId == dataOwnChatsMe.id) {
                const cardUserF = `
                <div class="wrapper-email-chat" id="${fromUserId}">
                    <div class="email-chat">${elem.from_user.email}</div>
                </div>
                `;
                chatsContent.insertAdjacentHTML('beforeend', cardUserF)
            }
            if(fromUserId == dataOwnChatsMe.id) {
                const cardUserF = `
                <div class="wrapper-email-chat" id="${toUserId}">
                    <div class="email-chat">${elem.to_user.email}</div>
                </div>
                `;
                chatsContent.insertAdjacentHTML('beforeend', cardUserF)
            }
        }

    })
}

//события
window.addEventListener('DOMContentLoaded', async (e) => {
    const data = JSON.parse(localStorage.getItem('tokens'));
    if(data) {

        const dataData = await getDataMyInfo(urlBasic, endPointMyInfo);
        if(dataData) {
            containerReg.style.display = 'none';
            mainContainer.style.display = 'block';
            nickNameLoad.textContent = data.email;
            nickNameLoad.id = dataData.id;
        }
        chatsListBtn.style.opacity = '0.4';

        showOwnChats();
    }

    const localPhoto = JSON.parse(localStorage.getItem("profilePhoto"))
    if(localPhoto) {
        const localUrl = localPhoto.url;
        photoBox.style.backgroundImage = `url(${localUrl})`;
        userPhoto.style.backgroundImage = `url(${localUrl})`
    }
})

// window.addEventListener('scroll', populate);
settingsBtn.addEventListener('click', (e) => {
    showSettings();
    profileBtn.style.opacity = '1';
    settingsBtn.style.opacity = '0.4';
});
modalWindowSettings.addEventListener('click', hideSettings)
allUsersContent.addEventListener('mouseover', (e) => {
    let target = e.target;
    let containerChats = target.closest('.all-users-content');
    let users = target.closest('.email-user');
    if(containerChats || users) {
        allUsersContent.style.overflowY = `scroll`;
        allUsersContent.style.paddingRight = '17' + 'px';
    }  
})
allUsersContent.addEventListener('mouseout', () => {
    allUsersContent.style.overflowY = `hidden`;
    allUsersContent.style.paddingRight = '20' + 'px';

})
chatsContent.addEventListener('mouseover', (e) => {
    let target = e.target;
    let containerChats = target.closest('.chats-content');
    let users = target.closest('.email-chat');
    if(containerChats || users) {
        chatsContent.style.overflowY = `scroll`;
        chatsContent.style.paddingRight = '17' + 'px';
    }  
})
chatsContent.addEventListener('mouseout', () => {
    chatsContent.style.overflowY = `hidden`;
    chatsContent.style.paddingRight = '20' + 'px';

})
btnSearchInInput.addEventListener('click', searchUsersFoo)
btnSearchInInputChats.addEventListener('click', searchChatsFoo)

allUsersBtn.addEventListener('click', () => {
    showAllUsers();
    allUsersBtn.style.opacity = '0.4';
    chatsListBtn.style.opacity = '1';
    profileBtn.style.opacity = '1';
    settingsBtn.style.opacity = '1';
    exitBtn.style.opacity = '1'

})
exitBtn.addEventListener('click', () => {
    exitEvent();
    allUsersBtn.style.opacity = '1';
    chatsListBtn.style.opacity = '1';
    profileBtn.style.opacity = '1';
    settingsBtn.style.opacity = '1';
    exitBtn.style.opacity = '0.4'
})
chatsListBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    searchInputChats.value = '';
    allUsersBtn.style.opacity = '1';
    chatsListBtn.style.opacity = '0.4';
    profileBtn.style.opacity = '1';
    settingsBtn.style.opacity = '1';
    exitBtn.style.opacity = '1'

    await showOwnChats();
})
})


