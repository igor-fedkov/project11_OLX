const mainRenderPageEl = document.querySelector('body');
// логин: test@test.com Пароль: Qwerty123
// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'call/favourite/';
const key = localStorage.getItem('accessToken');
const options = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${key}`,
  },
};
// Вызов функции удаления карточки с модалки
mainRenderPageEl.addEventListener('click', deleteCardFromModal);

// Функция удаления карточки из API по ID
function deleteFavoriteItem(URL, keyPart, id, options) {
  return fetch(`${URL}${keyPart}${id}`, options)
    .then(response => response.json())
    .then(response => console.log(response.message))
    .catch(error => console.log('Error'));
}
// Функция удаления карточки из модального окна
function deleteCardFromModal(evt) {
  if (evt.target.hasAttribute('data-favorite-button-marked')) {
    evt.target.closest('[data-favorite-item]').remove();
    const id = evt.target.closest('[data-favorite-item]').getAttribute('id');
    deleteFavoriteItem(URL, keyPart, id, options);
  }
}
