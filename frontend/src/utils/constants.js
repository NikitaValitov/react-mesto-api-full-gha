export const initialCards = [
   {
     name: 'Архыз',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
     name: 'Челябинская область',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
     name: 'Иваново',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
     name: 'Камчатка',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
     name: 'Холмогорский район',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
     name: 'Байкал',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
 ];

 export const config = {
   formSelector: '.form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save',
   inactiveButtonClass: 'popup__save_invalid',
   inputErrorClass: 'popup__input_state_invalid',
 }

 export const configApi = {
  url: 'http://localhost:3001',
  // headers: {
  //   "content-type": 'application/json',
  //   "authorization": '570b2666-b41f-4db7-ab46-34b70d53b1fa'
  // }
 }