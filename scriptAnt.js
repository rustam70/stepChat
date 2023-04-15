const URL2 = 'http://192.168.0.199:8000/'; 
const IP = '192.168.0.199:8000';
const inputMessage = document.querySelector('#input-message'),
      sendMessageButton = document.querySelector('.send-btn'),
      messageArea = document.querySelector('.main'),
      sendArea = document.querySelector('.footer');
const chatsContent = document.querySelector('.chats-content');
const allUsersContent = document.querySelector('.all-users-content-double');
const emojiButton = document.querySelector('.emoji-icon'),
      emojiPack = document.querySelector('.emoji-pack');
const chatsListBtnAnt = document.querySelector('.chats-list-btn');
const newChatName = document.querySelector('.new-chat-name');    
const myID = document.querySelector('.nickname');
const searchInput = document.querySelector('.search-input'),
    //   searchButton = document.querySelector('.search-icon'),
    //   prevMessageButton = document.querySelector('.prev-message'),
    //   nextMessageButton = document.querySelector('.next-message'),
    //   searchBlock = document.querySelector('.search-block'),
      search = document.querySelector('.search');

// ОБЩАЯ ФУНКЦИЯ ЗАПРОСА
const letFetch = async(url, method, body) => {
    const req = await fetch(url, {
        method: method,
        body: body,
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('tokens')).token_type}`,
        }
    })
    return await req.json();
}

// ОТОБРАЖЕНИЕ СООБЩЕНИЙ НА СТРАНИЦЕ
const renderMyMessages = (data) => {
    messageArea.textContent = '';
    data.messages.forEach(item => {
        const messageText = document.createElement('p');
        messageText.textContent = item.content;
        messageArea.append(messageText);
        item.from_user.id == localStorage.getItem('myID') ? messageText.classList.add('right') : messageText.classList.add('left');
    })
    window.scrollTo(0, document.body.scrollHeight);
}

// ЗАПРОС НА ПОЛУЧЕНИЕ МОИХ СООБЩЕНИЙ
const getMyMessages = async (chatID) => {
    const response =  await letFetch(URL2 + 'chat/' + chatID, 'GET');
    renderMyMessages(response);
}

// СОЗДАНИЕ WEBSOCKET'а
let socket;
const createWebSocket = (chatID) => {
    socket = new WebSocket('ws://' + IP + '/chat/ws/' + chatID);
    // getMyMessages(chatID);

    const socketAction = () => {
        const message = {
            content: inputMessage.value,
            from_user_id: localStorage.getItem('myID'),     
        }
    
        if(inputMessage.value != '') {
            socket.send(JSON.stringify(message));
    
            const test = document.createElement('p');
            test.textContent = inputMessage.value;
            test.classList.add('right')
            messageArea.append(test);
        }
        inputMessage.value = '';    
    }
    
    sendMessageButton.addEventListener('click', () => socketAction(chatID));
    inputMessage.addEventListener('keydown', (e) => {e.keyCode == 13 ? socketAction(chatID) : ''})
    
    socket.addEventListener('open', () => console.log('WebSocket connection established'));
    socket.addEventListener('close', () => console.log('WebSocket connection closed'));
    socket.addEventListener('error', (event) => console.error('WebSocket Error', event));    
    socket.addEventListener('message', (event) => console.log(event.data));
    socket.addEventListener('message', () => getMyMessages(chatID));
}

// НАЧАТЬ ЧАТ С ПОЛЬЗОВАТЕЛЕМ, С КОТОРЫМ ЕСТЬ ЧАТ
chatsContent.addEventListener('click', (event) => {
    if(event.target.closest('.wrapper-email-chat')) {
        createWebSocket(event.target.parentNode.id);
        getMyMessages(event.target.parentNode.id);
    }

    if(event.target.closest('.email-chat')) {
        newChatName.textContent = event.target.textContent;
        searchInput.value = '';
    }
})

// ПОЛУЧИТЬ МОИ ЧАТЫ
const getMyOwnChats = async (userID) => {
    const response = await letFetch(URL2 + 'chat/my', 'GET');    
    console.log(response);
    response.chats.forEach(item => {
        if(item.from_user.id == userID || item.to_user.id == userID) {
            createWebSocket(item.id);
            getMyMessages(item.id);
        }        
    })
}

// СОЗДАТЬ НОВЫЙ ЧАТ
const createNewChat = async (userID) => {
    const response = await letFetch(URL2 + 'chat/create/' + userID, 'POST');
    if(response.res != 'existed') {
        createWebSocket(response.id); // response.id = id чата    
        getMyMessages(response.id); 
    } else {
        getMyOwnChats(userID);        
    }
}

// НАЧАТЬ НОВЫЙ ЧАТ С ПОЛЬЗОВАТЕЛЕМ
allUsersContent.addEventListener('click', (event) => {
    if(event.target.closest('.one-user-container')) {
        createNewChat(event.target.id); // event.target.id = id пользователя
        newChatName.textContent = event.target.title;
        searchInput.value = '';
    }
})

// EMOJI
emojiButton.addEventListener('click', () => emojiPack.classList.toggle('hidden'));

document.addEventListener('click', (e) => {
    if(!e.target.closest('.emoji-pack') && !e.target.closest('.emoji-icon')) {
        emojiPack.classList.add('hidden');
    }
})

emojiPack.addEventListener('click', (e) => {
    if(e.target.closest('.emoji')) {
        inputMessage.value += e.target.textContent;
    }
})

// ПОИСК СООБЩЕНИЙ
let foundMessages;
let index = 0;
const showRequiredMessage = (array, number) => {
    messageArea.childNodes.forEach(item => item.style.backgroundColor = '');
    array[number].scrollIntoView({behavior: "smooth", block: "center"});
    array[number].style.backgroundColor = 'yellow';    
}

search.addEventListener('click', (event) => {    
    if(event.target.closest('.search-icon') && searchInput.value != '' && messageArea.childNodes.length != 0) {
        foundMessages = [...messageArea.childNodes].filter(item => item.innerText.toLowerCase().includes(searchInput.value.toLowerCase()));
        foundMessages.length != 0 ? showRequiredMessage(foundMessages, index) : searchInput.value = 'Not found';               
    }   

    if(event.target.closest('.prev-message') && foundMessages != undefined) {
        index--;
        index == -1 ? index = foundMessages.length - 1 : index;
        showRequiredMessage(foundMessages, index);
    }

    if(event.target.closest('.next-message') && foundMessages != undefined) {
        index++;
        index == foundMessages.length ? index = 0 : index;
        showRequiredMessage(foundMessages, index);
    }

    searchInput.addEventListener('keyup', () => index = 0);
})
