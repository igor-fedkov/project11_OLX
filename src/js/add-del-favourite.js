// Элементы DOM-дерева
const mainRenderPageEl = document.querySelector('body');
const iconHeartContured = document.querySelector('[data-heartIconContured]');
const iconHeartFull = document.querySelector('[data-heartIconFull]');
import { loadKey } from './local-storage';
// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'call/favourite/';
const key = localStorage.getItem('accessToken');
const optionsPost = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${loadKey('refreshToken')}`,
  },
};
const optionsDel = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loadKey('refreshToken')}`,
    },
  };
// Вызов функции добавления товара в Избранное
mainRenderPageEl.addEventListener('click', onClick);

// Функция добавления карточки товара на API-сервер
async function addFavorite(URL, keyPart, id, optionsPost) {
    return await fetch(`${URL}${keyPart}${id}`, optionsPost).then(r => alreadyAddedMessage(r));

//   return fetch(`${URL}${keyPart}${id}`, optionsPost)
//     .then(response => response.json())
//     .then(post => alert('This product is already in favorites'))
//     .catch(error => alert('This product is already in favorites'));
}
// Функция добавления карточки товара в избранное по клику на сердечко
function onClick(evt) {
    if (evt.target.hasAttribute('data-favorite-button')) {
        if(evt.target.dataset.marked === 'false') {
            iconHeartFull.classList.remove('visually-hidden');
            iconHeartContured.classList.add('visually-hidden');
        
            const id = evt.target.closest('[data-item]').getAttribute('id');
            
            evt.target.dataset.marked='true';

            addFavorite(URL, keyPart, id, optionsPost);
        } else  {
            deleteCardFromModal(evt);
            
        }
  }
}

// Функция удаления карточки из API по ID
async function deleteFavoriteItem(URL, keyPart, id, optionsDel) {
    return await fetch(`${URL}${keyPart}${id}`, optionsDel)
      .then(response => response.json())
      .then(response => console.log(response.message))
      .catch(error => console.log('Error'));
  }
  // Функция удаления карточки из модального окна
function deleteCardFromModal(evt) {

 
    iconHeartFull.classList.add('visually-hidden');
    iconHeartContured.classList.remove('visually-hidden');
    // console.log(evt.target.dataset.marked);
   const id = evt.target.closest('[data-item]').getAttribute('id');
   deleteFavoriteItem(URL, keyPart, id, optionsDel);
   evt.target.dataset.marked='false';
}

function alreadyAddedMessage(r) {
    if (r.status === 200) {
      return;
    }
    if (r.status === 403) {
      alert('This product is already in favorites');
    }
  }
  
  
