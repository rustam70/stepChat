"use strict";

var URL = 'http://172.28.0.202:8000/'; // const URL = 'http://192.168.0.199:8000/'; // мой домашний
// const URL = 'http://192.168.1.5:8000/'; 

var inputMessage = document.querySelector('#input-message'),
    sendMessageButton = document.querySelector('.send-btn'),
    messageArea = document.querySelector('.main'),
    sendArea = document.querySelector('.footer');
var chatsContent = document.querySelector('.chats-content');
var allUsersContent = document.querySelector('.all-users-content-double');
var emojiButton = document.querySelector('.emoji-icon'),
    emojiPack = document.querySelector('.emoji-pack');
var chatsListBtnAnt = document.querySelector('.chats-list-btn'); // ОБЩАЯ ФУНКЦИЯ ЗАПРОСА

var letFetch = function letFetch(url, method, body) {
  var req;
  return regeneratorRuntime.async(function letFetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: method,
            body: body,
            headers: {
              "accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer ".concat(JSON.parse(localStorage.getItem('tokens')).token_type)
            }
          }));

        case 2:
          req = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(req.json());

        case 5:
          return _context.abrupt("return", _context.sent);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}; // ОТОБРАЖЕНИЕ СООБЩЕНИЙ НА СТРАНИЦЕ


var renderMyMessages = function renderMyMessages(data) {
  messageArea.textContent = '';
  data.messages.forEach(function (item) {
    var messageText = document.createElement('p');
    messageText.textContent = item.content;
    messageArea.append(messageText);
    item.from_user.id == 3 ? messageText.classList.add('right') : messageText.classList.add('left'); // item.from_user.id == JSON.parse(localStorage.getItem('tokens')).myID ? messageText.classList.add('right') : messageText.classList.add('left');
  });
}; // ЗАПРОС НА ПОЛУЧЕНИЕ МОИХ СООБЩЕНИЙ


var getMyMessages = function getMyMessages(chatID) {
  var response;
  return regeneratorRuntime.async(function getMyMessages$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(letFetch(URL + 'chat/' + chatID, 'GET'));

        case 2:
          response = _context2.sent;
          renderMyMessages(response);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // СОЗДАНИЕ WEBSOCKET'а


var socket;

var createWebSocket = function createWebSocket(chatID) {
  socket = new WebSocket("ws://172.28.0.202:8000/chat/ws/".concat(chatID));

  var socketAction = function socketAction(id) {
    var message = {
      content: inputMessage.value,
      from_user_id: 3 // from_user_id: JSON.parse(localStorage.getItem('tokens')).myID,     

    };

    if (inputMessage.value != '') {
      socket.send(JSON.stringify(message));
      var test = document.createElement('p');
      test.textContent = inputMessage.value;
      test.classList.add('right');
      messageArea.append(test);
    }

    inputMessage.value = ''; // НАДО РАЗОБРАТЬСЯ С ЭТИМ, ВООБЩЕ НЕ ПОНЯЛ КАК ЭТО РАБОТАЕТ
    // getMyMessages(id);
    // console.log(id);
  };

  sendMessageButton.addEventListener('click', function () {
    return socketAction(chatID);
  });
  inputMessage.addEventListener('keydown', function (e) {
    e.keyCode == 13 ? socketAction(chatID) : '';
  });
  socket.addEventListener('open', function () {
    return console.log('WebSocket connection established');
  });
  socket.addEventListener('close', function () {
    return console.log('WebSocket connection closed');
  });
  socket.addEventListener('error', function (event) {
    return console.error('WebSocket Error', event);
  });
  socket.addEventListener('message', function (event) {
    return console.log(event.data);
  }); // НУЖНО ПРОТЕСТИРОВАТЬ НА ЗАНЯТИИ

  socket.addEventListener('message', function (event) {
    return getMyMessages(chatID);
  });
}; // НАЧАТЬ ЧАТ С ПОЛЬЗОВАТЕЛЕМ, С КОТОРЫМ ЕСТЬ ЧАТ


chatsContent.addEventListener('dblclick', function (event) {
  if (event.target.closest('.wrapper-email-chat')) {
    createWebSocket(event.target.parentNode.id);
    getMyMessages(event.target.parentNode.id); // console.log(event.target.parentNode.id);     
  }
}); // ПОЛУЧИТЬ МОИ ЧАТЫ

var getMyOwnChats = function getMyOwnChats(userID) {
  var response;
  return regeneratorRuntime.async(function getMyOwnChats$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(letFetch(URL + 'chat/my', 'GET'));

        case 2:
          response = _context3.sent;
          response.chats.forEach(function (item) {
            if (item.from_user.id == userID || item.to_user.id == userID) {
              createWebSocket(item.id);
              getMyMessages(item.id);
            }
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // СОЗДАТЬ НОВЫЙ ЧАТ


var createNewChat = function createNewChat(userID) {
  var response;
  return regeneratorRuntime.async(function createNewChat$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(letFetch(URL + 'chat/create/' + userID, 'POST'));

        case 2:
          response = _context4.sent;

          if (response.res != 'existed') {
            createWebSocket(response.id); // response.id = id чата    

            getMyMessages(response.id);
          } else {
            getMyOwnChats(userID);
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // НАЧАТЬ НОВЫЙ ЧАТ С ПОЛЬЗОВАТЕЛЕМ


allUsersContent.addEventListener('dblclick', function (event) {
  if (event.target.closest('.one-user-container')) {
    createNewChat(event.target.id); // event.target.id = id пользователя
  }
}); // emoji

emojiButton.addEventListener('click', function () {
  emojiPack.classList.toggle('hidden');
});
document.addEventListener('click', function (e) {
  if (!e.target.closest('.emoji-pack') && !e.target.closest('.emoji-icon')) {
    emojiPack.classList.add('hidden');
  }
});
emojiPack.addEventListener('click', function (e) {
  if (e.target.closest('.emoji')) {
    inputMessage.value += e.target.textContent;
  }
});