// Элементы DOM-дерева
const mainRenderPageEl = document.querySelector('body');
// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'call/favourite/';
const key = localStorage.getItem('accessToken');
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${key}`,
  },
};
// Вызов функции добавления товара в Избранное
mainRenderPageEl.addEventListener('click', onClick);

// Функция добавления карточки товара на API-сервер
function addFavorite(URL, keyPart, id, options) {
  return fetch(`${URL}${keyPart}${id}`, options).then(r => alreadyAddedMessage(r));
  // () => {
  // console.log('hello');
  // if (r.status === 200) {
  //   console.log(r.status);
  //   return;
  // } else {
  //   alert('This product is already in favorites');
  // }
  // });
}
// Функция добавления карточки товара в избранное по клику на сердечко
function onClick(evt) {
  if (evt.target.hasAttribute('data-favorite-button')) {
    const id = evt.target.closest('[data-item]').getAttribute('id');
    addFavorite(URL, keyPart, id, options);
  }
}
function alreadyAddedMessage(r) {
  if (r.status === 200) {
    return;
  }
  if (r.status === 403) {
    alert('This product is already in favorites');
  }
}
