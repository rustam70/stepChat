"use strict";

// const chatBtn = document.querySelector('#chat');
// http://172.28.0.202:8000/docs#/default
// http://192.168.1.5:8000/docs#/default
document.addEventListener('DOMContentLoaded', function _callee3() {
  var settingsBtn, modalWindowSettings, redTheme, blueTheme, greenTheme, opacityTheme, redChat, blueChat, greenChat, opacityChat, redFont, blueFont, greenFont, opacityFont, chatBackGround, anyText, chat, currentChat, formData, allUsersBtn, profileBtn, nickNameLoad, chatsContent, exitBtn, mainContainer, footerChat, containerReg, allUsersContent, chatsListBtn, infoRegistr, allUsersContentDouble, searchUsers, searchChats, btnSearchInInput, btnSearchInInputChats, searchInput, searchInputChats, userNotFound, limit, token, objColorsTheme, objColorsFont, objColorsChat, endPointMyInfo, endPointOwnChats, urlBasic, getDataMyInfo, renderUsers, eachUsers, renderCahts, eachChat, showLocalStorage, showSettings, mouseMove, mouseMoveColors, mouseDown, mouseMoveFont, mouseMoveColorsFont, mouseDownFont, mouseMoveChat, mouseMoveColorsChat, mouseDownChat, hideSettings, showAllUsers, showOwnChats, exitEvent, tokenVerification, searchUsersFoo, searchChatsFoo;
  return regeneratorRuntime.async(function _callee3$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          settingsBtn = document.querySelector('.settings');
          modalWindowSettings = document.querySelector('.wrapper-colors-settings');
          redTheme = document.querySelector('#red-theme');
          blueTheme = document.querySelector('#blue-theme');
          greenTheme = document.querySelector('#green-theme');
          opacityTheme = document.querySelector('#opacity-theme');
          redChat = document.querySelector('#red-chat');
          blueChat = document.querySelector('#blue-chat');
          greenChat = document.querySelector('#green-chat');
          opacityChat = document.querySelector('#opacity-chat');
          redFont = document.querySelector('#red-font');
          blueFont = document.querySelector('#blue-font');
          greenFont = document.querySelector('#green-font');
          opacityFont = document.querySelector('#opacity-font');
          chatBackGround = document.querySelectorAll('.chat-background');
          anyText = document.querySelector('.any-text');
          chat = document.querySelector('.chat');
          currentChat = document.querySelector('.current-chat');
          formData = document.querySelector('.form-data');
          allUsersBtn = document.querySelector('.all-users');
          profileBtn = document.querySelector('.profile-user-btn');
          nickNameLoad = document.querySelector('.nickname');
          chatsContent = document.querySelector('.chats-content');
          exitBtn = document.querySelector('.exit-btn');
          mainContainer = document.querySelector('.main-container');
          footerChat = document.querySelector('.footer');
          containerReg = document.querySelector('.wrapper-form-registr');
          allUsersContent = document.querySelector('.all-users-content');
          chatsListBtn = document.querySelector('.chats-list-btn');
          infoRegistr = document.querySelector('.info-registr');
          allUsersContentDouble = document.querySelector('.all-users-content-double');
          searchUsers = document.querySelector('.search-users');
          searchChats = document.querySelector('.search-chats');
          btnSearchInInput = document.querySelector('#btn-search-users');
          btnSearchInInputChats = document.querySelector('#btn-search-chats');
          searchInput = document.querySelector('#nickname-users-search-input');
          searchInputChats = document.querySelector('#nickname-chats-search-input');
          userNotFound = document.querySelector('.user-not-found');
          limit = 20;
          token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2ODExMzQ5MTB9.2wJ_EthnebiQHCi6X5D7kpumh-PHVXxOdPzcgmvmges'; //настройки цвета

          objColorsTheme = {
            red: '',
            green: '',
            blue: '',
            opacity: ''
          };
          objColorsFont = {
            red: '',
            green: '',
            blue: '',
            opacity: ''
          };
          objColorsChat = {
            red: '',
            green: '',
            blue: '',
            opacity: ''
          };
          endPointMyInfo = 'auth/me';
          endPointOwnChats = 'chat/my'; // let myId = '';
          // let myEmail = '';

          urlBasic = 'http://172.28.0.202:8000/'; // const urlBasic = 'http://192.168.1.5:8000/'

          getDataMyInfo = function getDataMyInfo(url, endPoint) {
            var tokDataOwnChats, tokOwnChats, headersOwnChats, response;
            return regeneratorRuntime.async(function getDataMyInfo$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    tokDataOwnChats = JSON.parse(localStorage.getItem("tokens"));
                    tokOwnChats = tokDataOwnChats.token_type;
                    headersOwnChats = new Headers({
                      "Authorization": "Bearer ".concat(tokOwnChats),
                      "Accept": "application/json"
                    });
                    _context.next = 5;
                    return regeneratorRuntime.awrap(fetch(url + endPoint, {
                      method: "GET",
                      headers: headersOwnChats
                    }));

                  case 5:
                    response = _context.sent;
                    _context.prev = 6;
                    _context.next = 9;
                    return regeneratorRuntime.awrap(response.json());

                  case 9:
                    return _context.abrupt("return", _context.sent);

                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context["catch"](6);
                    console.error("Error", _context.t0, response.status);

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[6, 12]]);
          }; // const myParams = await getDataMyInfo(urlBasic, endPointMyInfo);
          // console.log(myParams);
          // let myId = myParams.id;
          // let myEmail = myParams.email;
          //создание карточек пользователей, отображается слева, можно переключать на мои чаты


          renderUsers = function renderUsers(_ref) {
            var username = _ref.username,
                id = _ref.id,
                email = _ref.email,
                is_active = _ref.is_active;
            var borderLeft;

            if (is_active) {
              borderLeft = '#2f6c1b96';
            } else {
              borderLeft = '#741111ad';
            }

            var cardUser = "\n        <div class=\"one-user-container\" email=\"".concat(email, "\"  id=\"").concat(id, "\" style=\"border-left: 5px solid ").concat(borderLeft, "\">            \n            <div class=\"email-user\">\n                <div class=\"username-user\">Username: <span class=\"one-user-username\">").concat(username, "</span></div>\n                <div class=\"email-user-string\">Email: <span class=\"one-user-email\">").concat(email, "</span></div>\n            </div>            \n        </div>\n    ");
            allUsersContentDouble.insertAdjacentHTML('beforeend', cardUser);
          };

          eachUsers = function eachUsers(data) {
            chatsContent.textContent = '';
            data.forEach(function (element) {
              renderUsers(element);
            });
          }; //создание карточек чатов, можно переключать на всех пользователей, расположение - слева


          renderCahts = function renderCahts(_ref2) {
            var id, to_user, from_user, dataOwnChatsMe, cardUserF, cardUserT;
            return regeneratorRuntime.async(function renderCahts$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    id = _ref2.id, to_user = _ref2.to_user, from_user = _ref2.from_user;
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(getDataMyInfo(urlBasic, endPointMyInfo));

                  case 3:
                    dataOwnChatsMe = _context2.sent;

                    if (to_user.id == dataOwnChatsMe.id) {
                      cardUserF = "\n        <div class=\"wrapper-email-chat\" id=\"".concat(id, "\">\n            <div class=\"email-chat\">").concat(from_user.email, "</div>\n        </div>\n        ");
                      chatsContent.insertAdjacentHTML('beforeend', cardUserF);
                    } else if (from_user.id == dataOwnChatsMe.id) {
                      cardUserT = "\n            <div class=\"wrapper-email-chat\" id=\"".concat(id, "\">\n                <div class=\"email-chat\">").concat(to_user.email, "</div>\n            </div>\n        ");
                      chatsContent.insertAdjacentHTML('beforeend', cardUserT);
                    }

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          };

          eachChat = function eachChat(data) {
            return regeneratorRuntime.async(function eachChat$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    allUsersContentDouble.textContent = '';
                    chatsContent.textContent = '';
                    data.chats.forEach(function (elem) {
                      renderCahts(elem);
                    });

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }; //найстройки цвета, чтобы не пропадала выбранная цветовая тема после обновления


          showLocalStorage = function showLocalStorage() {
            var dataTheme = JSON.parse(localStorage.getItem('objColorsTheme'));
            var dataFont = JSON.parse(localStorage.getItem('objColorsFont'));
            var dataChat = JSON.parse(localStorage.getItem('objColorsChat'));

            if (dataTheme) {
              chatBackGround.forEach(function (elem) {
                elem.style.backgroundColor = "rgba(".concat(dataTheme.red, ", ").concat(dataTheme.green, ", ").concat(dataTheme.blue, ", ").concat(dataTheme.opacity / 10, ")");
              });
              formData.style.backgroundColor = "rgba(".concat(dataTheme.red, ", ").concat(dataTheme.green, ", ").concat(dataTheme.blue, ", ").concat(dataTheme.opacity / 10, ")");
              currentChat.style.borderRight = "1px solid rgba(".concat(dataTheme.red, ", ").concat(dataTheme.green, ", ").concat(dataTheme.blue, ", ").concat(dataTheme.opacity / 10, ")");
              footerChat.style.backgroundColor = "rgba(".concat(dataTheme.red, ", ").concat(dataTheme.green, ", ").concat(dataTheme.blue, ", ").concat(dataTheme.opacity / 10, ")");
            }

            if (dataFont) {
              anyText.style.color = "rgba(".concat(dataFont.red, ", ").concat(dataFont.green, ", ").concat(dataFont.blue, ", ").concat(dataFont.opacity / 10, ")");
              chat.style.color = "rgba(".concat(dataFont.red, ", ").concat(dataFont.green, ", ").concat(dataFont.blue, ", ").concat(dataFont.opacity / 10, ")");
            }

            if (dataChat) {
              currentChat.style.backgroundColor = "rgba(".concat(dataChat.red, ", ").concat(dataChat.green, ", ").concat(dataChat.blue, ", ").concat(dataChat.opacity / 10, ")");
              chatsContent.style.backgroundColor = "rgba(".concat(dataChat.red, ", ").concat(dataChat.green, ", ").concat(dataChat.blue, ", ").concat(dataChat.opacity / 10, ")");
              allUsersContent.style.backgroundColor = "rgba(".concat(dataChat.red, ", ").concat(dataChat.green, ", ").concat(dataChat.blue, ", ").concat(dataChat.opacity / 10, ")");
            }
          };

          showLocalStorage(); //открыть настройки, модалка

          showSettings = function showSettings() {
            modalWindowSettings.classList.remove('passive');
          }; //события на смену цвета


          mouseMove = function mouseMove() {
            chatBackGround.forEach(function (elem) {
              elem.style.backgroundColor = "rgba(".concat(redTheme.value, ", ").concat(greenTheme.value, ", ").concat(blueTheme.value, ", ").concat(opacityTheme.value / 10, ")");
            });
            formData.style.backgroundColor = "rgba(".concat(redTheme.value, ", ").concat(greenTheme.value, ", ").concat(blueTheme.value, ", ").concat(opacityTheme.value / 10, ")");
            currentChat.style.borderRight = "1px solid rgba(".concat(redTheme.value, ", ").concat(greenTheme.value, ", ").concat(blueTheme.value, ", ").concat(opacityTheme.value / 10 * 2, ")");
            footerChat.style.backgroundColor = "rgba(".concat(redTheme.value, ", ").concat(greenTheme.value, ", ").concat(blueTheme.value, ", ").concat(opacityTheme.value / 10, ")");
            objColorsTheme.red = redTheme.value;
            objColorsTheme.green = greenTheme.value;
            objColorsTheme.blue = blueTheme.value;
            objColorsTheme.opacity = opacityTheme.value;
            return "rgba(".concat(redTheme.value, ", ").concat(greenTheme.value, ", ").concat(blueTheme.value, ", ").concat(opacityTheme.value / 10, ")");
          };

          mouseMoveColors = function mouseMoveColors(foo) {
            document.addEventListener('mousemove', foo);
            document.addEventListener('mouseup', function () {
              localStorage.setItem('objColorsTheme', JSON.stringify(objColorsTheme));
              document.removeEventListener('mousemove', foo);
            });
          };

          mouseDown = function mouseDown(e) {
            var target = e.target;

            if (target.closest('#red-theme') || target.closest('#blue-theme') || target.closest('#green-theme') || target.closest('#opacity-theme')) {
              mouseMoveColors(mouseMove);
            }
          };

          document.addEventListener('mousedown', function (event) {
            mouseDown(event);
          });

          mouseMoveFont = function mouseMoveFont() {
            anyText.style.color = "rgba(".concat(redFont.value, ", ").concat(greenFont.value, ", ").concat(blueFont.value, ", ").concat(opacityFont.value / 10, ")");
            chat.style.color = "rgba(".concat(redFont.value, ", ").concat(greenFont.value, ", ").concat(blueFont.value, ", ").concat(opacityFont.value / 10, ")");
            objColorsFont.red = redFont.value;
            objColorsFont.green = greenFont.value;
            objColorsFont.blue = blueFont.value;
            objColorsFont.opacity = opacityFont.value;
          };

          mouseMoveColorsFont = function mouseMoveColorsFont(foo) {
            document.addEventListener('mousemove', foo);
            document.addEventListener('mouseup', function () {
              localStorage.setItem('objColorsFont', JSON.stringify(objColorsFont));
              document.removeEventListener('mousemove', foo);
            });
          };

          mouseDownFont = function mouseDownFont(e) {
            var target = e.target;

            if (target.closest('#red-font') || target.closest('#blue-font') || target.closest('#green-font') || target.closest('#opacity-font')) {
              mouseMoveColorsFont(mouseMoveFont);
            }
          };

          document.addEventListener('mousedown', function (event) {
            mouseDownFont(event);
          });

          mouseMoveChat = function mouseMoveChat() {
            currentChat.style.backgroundColor = "rgba(".concat(redChat.value, ", ").concat(greenChat.value, ", ").concat(blueChat.value, ", ").concat(opacityChat.value / 10, ")");
            chatsContent.style.backgroundColor = "rgba(".concat(redChat.value, ", ").concat(greenChat.value, ", ").concat(blueChat.value, ", ").concat(opacityChat.value / 10, ")");
            allUsersContent.style.backgroundColor = "rgba(".concat(redChat.value, ", ").concat(greenChat.value, ", ").concat(blueChat.value, ", ").concat(opacityChat.value / 10, ")");
            objColorsChat.red = redChat.value;
            objColorsChat.green = greenChat.value;
            objColorsChat.blue = blueChat.value;
            objColorsChat.opacity = opacityChat.value;
          };

          mouseMoveColorsChat = function mouseMoveColorsChat(foo) {
            document.addEventListener('mousemove', foo);
            document.addEventListener('mouseup', function () {
              localStorage.setItem('objColorsChat', JSON.stringify(objColorsChat));
              document.removeEventListener('mousemove', foo);
            });
          };

          mouseDownChat = function mouseDownChat(e) {
            var target = e.target;

            if (target.closest('#red-chat') || target.closest('#blue-chat') || target.closest('#green-chat') || target.closest('#opacity-chat')) {
              mouseMoveColorsChat(mouseMoveChat);
            }
          };

          document.addEventListener('mousedown', function (event) {
            mouseDownChat(event);
          }); //скрыть настройки

          hideSettings = function hideSettings(e) {
            var target = e.target;
            var closeBtn = target.closest('.close-settings-btn');
            var modalContent = target.closest('.forms');

            if (closeBtn || !modalContent) {
              modalWindowSettings.classList.add('passive');
              settingsBtn.style.opacity = '1';
            }
          }; //показать всех юзеров


          showAllUsers = function showAllUsers(e) {
            var getInfo, dataUsers;
            return regeneratorRuntime.async(function showAllUsers$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    userNotFound.classList.add('passive');
                    searchInput.value = '';
                    allUsersContentDouble.textContent = '';
                    chatsContent.textContent = '';
                    searchUsers.classList.remove('passive');
                    searchChats.classList.add('passive');
                    allUsersContent.classList.remove('passive');
                    chatsContent.classList.add('passive');

                    getInfo = function getInfo() {
                      var req;
                      return regeneratorRuntime.async(function getInfo$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return regeneratorRuntime.awrap(fetch('http://172.28.0.202:8000/auth/users/?skip=0&limit=100', {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json'
                                }
                              }));

                            case 2:
                              req = _context4.sent;
                              _context4.next = 5;
                              return regeneratorRuntime.awrap(req.json());

                            case 5:
                              return _context4.abrupt("return", _context4.sent);

                            case 6:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      });
                    };

                    _context5.next = 11;
                    return regeneratorRuntime.awrap(getInfo());

                  case 11:
                    dataUsers = _context5.sent;
                    eachUsers(dataUsers.users);

                  case 13:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          };

          showOwnChats = function showOwnChats(e) {
            var dataUsers;
            return regeneratorRuntime.async(function showOwnChats$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    searchUsers.classList.add('passive');
                    searchChats.classList.remove('passive');
                    chatsContent.classList.remove('passive');
                    allUsersContent.classList.add('passive');
                    _context6.next = 6;
                    return regeneratorRuntime.awrap(getDataMyInfo(urlBasic, endPointOwnChats));

                  case 6:
                    dataUsers = _context6.sent;
                    eachChat(dataUsers);

                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          }; // const populate = async () => {
          //     while(true) {
          //       let windowRelativeBottom = allUsersContent.getBoundingClientRect().bottom;
          //         if (windowRelativeBottom > allUsersContent.clientHeight + 200) {
          //             limit += 20;
          //             const getInfo = async () => {
          //                 const req = await fetch(`http://172.28.0.202:8000/auth/users/?skip=0&limit=${limit}`, {
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


          exitEvent = function exitEvent(e) {
            localStorage.removeItem('tokens');
            containerReg.style.display = 'flex';
            mainContainer.style.display = 'none';
            infoRegistr.style.display = 'flex';
          };

          tokenVerification = function tokenVerification() {
            var date = JSON.parse(localStorage.getItem('tokens'));

            if (date) {
              var dateMinute = +date.minute;
              var newDate = new Date();

              if (dateMinute + 4800000 < newDate.getTime()) {
                localStorage.removeItem('tokens');
                containerReg.style.display = 'flex';
                mainContainer.style.display = 'none';
                infoRegistr.style.display = 'flex';
              }
            }
          };

          setInterval(function () {
            tokenVerification();
          }, 5000);

          searchUsersFoo = function searchUsersFoo() {
            var value, getInfo, dataUsers, identif;
            return regeneratorRuntime.async(function searchUsersFoo$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    value = searchInput.value;

                    getInfo = function getInfo() {
                      var req;
                      return regeneratorRuntime.async(function getInfo$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.next = 2;
                              return regeneratorRuntime.awrap(fetch('http://172.28.0.202:8000/auth/users/?skip=0&limit=20', {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json'
                                }
                              }));

                            case 2:
                              req = _context7.sent;
                              _context7.next = 5;
                              return regeneratorRuntime.awrap(req.json());

                            case 5:
                              return _context7.abrupt("return", _context7.sent);

                            case 6:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      });
                    };

                    _context8.next = 4;
                    return regeneratorRuntime.awrap(getInfo());

                  case 4:
                    dataUsers = _context8.sent;
                    identif = false;
                    dataUsers.users.forEach(function (elem) {
                      if (elem.email.toLowerCase() === value.toLowerCase()) {
                        console.log('усть');
                        userNotFound.classList.add('passive');
                        allUsersContentDouble.textContent = '';
                        renderUsers(elem);
                        identif = true;
                        return identif;
                      }
                    });

                    if (!identif) {
                      console.log('hh');
                      allUsersContentDouble.textContent = '';
                      userNotFound.classList.remove('passive');
                    }

                  case 8:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          };

          searchChatsFoo = function searchChatsFoo() {
            var value, dataUsersNew, dataOwnChatsMe;
            return regeneratorRuntime.async(function searchChatsFoo$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    value = searchInputChats.value;
                    _context9.next = 3;
                    return regeneratorRuntime.awrap(getDataMyInfo(urlBasic, endPointOwnChats));

                  case 3:
                    dataUsersNew = _context9.sent;
                    _context9.next = 6;
                    return regeneratorRuntime.awrap(getDataMyInfo(urlBasic, endPointMyInfo));

                  case 6:
                    dataOwnChatsMe = _context9.sent;
                    chatsContent.textContent = '';
                    dataUsersNew.chats.forEach(function (elem) {
                      var fromUserId = elem.from_user.id;
                      var toUserId = elem.to_user.id;

                      if (elem.to_user.email.toLowerCase() == value.toLowerCase() || elem.from_user.email.toLowerCase() == value.toLowerCase()) {
                        chatsContent.textContent = '';

                        if (toUserId == dataOwnChatsMe.id) {
                          var cardUserF = "\n                <div class=\"wrapper-email-chat\" id=\"".concat(fromUserId, "\">\n                    <div class=\"email-chat\">").concat(elem.from_user.email, "</div>\n                </div>\n                ");
                          chatsContent.insertAdjacentHTML('beforeend', cardUserF);
                        }

                        if (fromUserId == dataOwnChatsMe.id) {
                          var _cardUserF = "\n                <div class=\"wrapper-email-chat\" id=\"".concat(toUserId, "\">\n                    <div class=\"email-chat\">").concat(elem.to_user.email, "</div>\n                </div>\n                ");

                          chatsContent.insertAdjacentHTML('beforeend', _cardUserF);
                        }
                      }
                    });

                  case 9:
                  case "end":
                    return _context9.stop();
                }
              }
            });
          }; //события


          window.addEventListener('DOMContentLoaded', function _callee(e) {
            var data, dataData, localPhoto, localUrl;
            return regeneratorRuntime.async(function _callee$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    data = JSON.parse(localStorage.getItem('tokens'));

                    if (!data) {
                      _context10.next = 8;
                      break;
                    }

                    _context10.next = 4;
                    return regeneratorRuntime.awrap(getDataMyInfo(urlBasic, endPointMyInfo));

                  case 4:
                    dataData = _context10.sent;

                    if (dataData) {
                      containerReg.style.display = 'none';
                      mainContainer.style.display = 'block';
                      nickNameLoad.textContent = data.email;
                    }

                    chatsListBtn.style.opacity = '0.4';
                    showOwnChats();

                  case 8:
                    localPhoto = JSON.parse(localStorage.getItem("profilePhoto"));

                    if (localPhoto) {
                      localUrl = localPhoto.url;
                      photoBox.style.backgroundImage = "url(".concat(localUrl, ")");
                      userPhoto.style.backgroundImage = "url(".concat(localUrl, ")");
                    }

                  case 10:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          }); // window.addEventListener('scroll', populate);

          settingsBtn.addEventListener('click', function (e) {
            showSettings();
            profileBtn.style.opacity = '1';
            settingsBtn.style.opacity = '0.4';
          });
          modalWindowSettings.addEventListener('click', hideSettings);
          allUsersContent.addEventListener('mouseover', function (e) {
            var target = e.target;
            var containerChats = target.closest('.all-users-content');
            var users = target.closest('.email-user');

            if (containerChats || users) {
              allUsersContent.style.overflowY = "scroll";
              allUsersContent.style.paddingRight = '17' + 'px';
            }
          });
          allUsersContent.addEventListener('mouseout', function () {
            allUsersContent.style.overflowY = "hidden";
            allUsersContent.style.paddingRight = '20' + 'px';
          });
          chatsContent.addEventListener('mouseover', function (e) {
            var target = e.target;
            var containerChats = target.closest('.chats-content');
            var users = target.closest('.email-chat');

            if (containerChats || users) {
              chatsContent.style.overflowY = "scroll";
              chatsContent.style.paddingRight = '17' + 'px';
            }
          });
          chatsContent.addEventListener('mouseout', function () {
            chatsContent.style.overflowY = "hidden";
            chatsContent.style.paddingRight = '20' + 'px';
          });
          btnSearchInInput.addEventListener('click', searchUsersFoo);
          btnSearchInInputChats.addEventListener('click', searchChatsFoo);
          allUsersBtn.addEventListener('click', function () {
            showAllUsers();
            allUsersBtn.style.opacity = '0.4';
            chatsListBtn.style.opacity = '1';
            profileBtn.style.opacity = '1';
            settingsBtn.style.opacity = '1';
            exitBtn.style.opacity = '1';
          });
          exitBtn.addEventListener('click', function () {
            exitEvent();
            allUsersBtn.style.opacity = '1';
            chatsListBtn.style.opacity = '1';
            profileBtn.style.opacity = '1';
            settingsBtn.style.opacity = '1';
            exitBtn.style.opacity = '0.4';
          });
          chatsListBtn.addEventListener('click', function _callee2(e) {
            return regeneratorRuntime.async(function _callee2$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    e.preventDefault();
                    searchInputChats.value = '';
                    allUsersBtn.style.opacity = '1';
                    chatsListBtn.style.opacity = '0.4';
                    profileBtn.style.opacity = '1';
                    settingsBtn.style.opacity = '1';
                    exitBtn.style.opacity = '1';
                    _context11.next = 9;
                    return regeneratorRuntime.awrap(showOwnChats());

                  case 9:
                  case "end":
                    return _context11.stop();
                }
              }
            });
          });

        case 86:
        case "end":
          return _context12.stop();
      }
    }
  });
});