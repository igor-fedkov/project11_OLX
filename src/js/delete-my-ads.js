const myAdsSectionEl = document.querySelector('#my-ads-section');
// логин: test@test.com Пароль: Qwerty123
// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'call/';
const key = localStorage.getItem('accessToken');
const options = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${key}`,
  },
};
// ВЫЗОВЫ ФУКЦИЙ:
// Вызов функции удаления карточки
myAdsSectionEl.addEventListener('click', deleteAdFromModal);
// ОБЪЯВЛЕНИЕ ФУНКЦИЙ:
// удаление карточки из API по ID
function deleteAdFromApi(URL, keyPart, id, options) {
  return fetch(`${URL}${keyPart}${id}`, options)
    .then(response => response.json())
    .then(response => console.log(response.message))
    .catch(error => console.log('Error'));
}
// удаление карточки из модального окна
function deleteAdFromModal(evt) {
  if (evt.target.hasAttribute('data-remove-ad-button')) {
    evt.target.closest('[data-my-ads-item]').remove();
    const id = evt.target.closest('[data-my-ads-item]').getAttribute('id');
    deleteAdFromApi(URL, keyPart, id, options);
  }
}
