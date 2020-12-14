import talkToApiServer from './talk-to-api-finction';

// USER REGISTRATION
// Функция для отправки регистрационных данных на API +
// Функция записи данных в Локал сторедж
// Фeнкция отправки Токена
const URL = 'https://callboard-backend.herokuapp.com';
const keyPart = '/auth/register';

const options = {
  email: 'user@example12.com',
  // email: document.querySelector('#idEmailInout')
  password: '123qwerty123',
  // password: document.querySelector('#idPaswordInput'),
};
//talkToApiServer(URL, keyPart, options);
// element.addEventListener('klick', talkToApiServer(URL, keyPart, options))
