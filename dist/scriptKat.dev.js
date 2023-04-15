"use strict";

// const URL = "http://172.28.0.202:8000/";
var URLuserMe = "http://172.28.0.202:8000/"; // const URLuserMe = "http://192.168.1.5:8000/";

var tokenMe = "auth/me";
var infoOnline = document.querySelector(".profile-photo");
var profileForm = document.querySelector(".profile");
var profileContainer = document.querySelector(".profile-info");
var isActiveBox = document.querySelector(".is-active");
var onlineBox = document.querySelector(".offline");
var textInfoOnline = document.querySelector(".online-text");
var textInfoOffline = document.querySelector(".offline-text");
var profileBtn = document.querySelector(".profile-user-btn");
var container = document.querySelector(".container-profile");
var userPhoto = document.querySelector(".image-user");
var urlBear = "https://drasler.ru/wp-content/uploads/2019/05/%D0%9A%D1%80%D1%83%D1%82%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%BD%D0%B0-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D1%83-%D1%8F-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-024.jpg";
var urlBmw = "https://avatarzo.ru/wp-content/uploads/sportivnyj-bmw.jpg";
var urlCat = "https://omoro.ru/wp-content/uploads/2018/05/prikilnie-kartinki-na-avatarky-dlia-devyshek-48.jpg";
var photoBox = document.querySelector(".photo");
var choseContainer = document.querySelector(".chose");
photoBox.style.backgroundImage = "url(https://i.pinimg.com/originals/8a/de/fe/8adefe5af862b4f9cec286c6ee4722cb.jpg)";
var tok;
var email;
var urlPhoto;
var totalUrlPhoto; // const nickName = document.querySelector('.nickname');
// const headers = new Headers();
// headers.append("accept","application/json");
// const tokData = JSON.parse(localStorage.getItem("tokens"));
// console.log(tokData);
// const tok = tokData.token_type;
// console.log(tok);
// headers.append("Authorization",`Bearer ${tok}`);

var saveProfilePhoto = function saveProfilePhoto() {
  var dataInfo = {
    "url": totalUrlPhoto
  };
  localStorage.setItem("profilePhoto", JSON.stringify(dataInfo));
};

var openChoseBox = function openChoseBox(e) {
  e.preventDefault();
  var target = e.target;

  if (target.closest(".photo")) {
    choseContainer.classList.toggle("none-text");
  }
};

var changePhoto = function changePhoto(e) {
  e.preventDefault();
  var target = e.target;

  if (target.closest(".bear")) {
    photoBox.style.backgroundImage = "url(".concat(urlBear, ")");
    userPhoto.style.backgroundImage = "url(".concat(urlBear, ")");
    totalUrlPhoto = urlBear;
    saveProfilePhoto();
    choseContainer.classList.toggle("none-text");
  }

  if (target.closest(".bmw")) {
    photoBox.style.backgroundImage = "url(".concat(urlBmw, ")");
    userPhoto.style.backgroundImage = "url(".concat(urlBmw, ")");
    totalUrlPhoto = urlBmw;
    saveProfilePhoto();
    choseContainer.classList.toggle("none-text");
  }

  if (target.closest(".cat")) {
    photoBox.style.backgroundImage = "url(".concat(urlCat, ")");
    userPhoto.style.backgroundImage = "url(".concat(urlCat, ")");
    totalUrlPhoto = urlCat;
    saveProfilePhoto();
    choseContainer.classList.toggle("none-text");
  }
};

var getData = function getData(URL) {
  var tokData, tok, headers, response;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tokData = JSON.parse(localStorage.getItem("tokens"));
          tok = tokData.token_type;
          headers = new Headers({
            "Authorization": "Bearer ".concat(tok),
            "Accept": "application/json"
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(URL, {
            method: "GET",
            headers: headers
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
}; // const dataProf = await getData()


var closeModalCart = function closeModalCart(e) {
  var target = e.target;
  var modalContent = target.closest(".profile");

  if (!modalContent) {
    container.classList.add("none-text");
    profileContainer.textContent = "";
    profileBtn.style.opacity = '1';
  }
};

var createProfileCard = function createProfileCard(_ref) {
  var id = _ref.id,
      email = _ref.email;
  var profileCard = "\n        <h3>Your id: <span class=\"my-id\">".concat(id, "</span></h3>\n        <div class=\"line\"></div>\n        <h3>Your email: ").concat(email, "</h3>\n        <div class=\"line\"></div>\n    ");
  profileContainer.insertAdjacentHTML("beforeend", profileCard);
};

var getProfileData = function getProfileData(e) {
  getData(URLuserMe + tokenMe).then(function (response) {
    createProfileCard(response); // console.log(response);

    container.classList.remove("none-text");

    if (response.is_active) {
      textInfoOnline.classList.remove("none-text");
      textInfoOnline.classList.add("active-text");
      onlineBox.classList.remove("none-text");
      onlineBox.classList.remove("offline");
      onlineBox.classList.add("active-text");
      onlineBox.classList.add("online");
    }
  });
};

container.addEventListener("click", closeModalCart);
profileBtn.addEventListener("click", function _callee(e) {
  var allUsersBtn, chatsListBtn, settingsBtn, exitBtn;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          e.preventDefault();
          profileBtn.style.opacity = '0.4';
          allUsersBtn = document.querySelector('.all-users');
          chatsListBtn = document.querySelector('.chats-list-btn');
          settingsBtn = document.querySelector('.settings');
          exitBtn = document.querySelector('.exit-btn');
          allUsersBtn.style.opacity = '1';
          chatsListBtn.style.opacity = '1';
          settingsBtn.style.opacity = '1';
          exitBtn.style.opacity = '1';
          _context2.next = 12;
          return regeneratorRuntime.awrap(getProfileData());

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
});
photoBox.addEventListener("click", openChoseBox);
choseContainer.addEventListener("click", changePhoto); // window.addEventListener("DOMContentLoaded", () => {
//     const localPhoto = JSON.parse(localStorage.getItem("profilePhoto"))
//     if(localPhoto) {
//         const localUrl = localPhoto.url;
//         photoBox.style.backgroundImage = `url(${localUrl})`;
//         userPhoto.style.backgroundImage = `url(${localUrl})`
//     }
// })