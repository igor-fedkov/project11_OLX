import parsFavoritesList from '../templates/favourites-section.hbs';
import { loadKey } from './local-storage';

// Элементы DOM-дерева
const favoriteSectionEl = document.querySelector('#favorite-section');
const addBackdropEl = favoriteSectionEl.querySelector('#add-backdrop');
const closeButtonEl = favoriteSectionEl.querySelector('#close-section-button');
const fevoritesListEl = favoriteSectionEl.querySelector('#favourites-list');
const showFavoriteButtonEl1 = document.querySelector('#show-favorites-button1');
const showFavoriteButtonEl2 = document.querySelector('#show-favorites-button2');
// console.log(showFavoriteButtonEl1);
// console.log(showFavoriteButtonEl2);

// Переменные для ввода данных
const URL = 'https://callboard-backend.herokuapp.com/';
const keyPart = 'call/favourites';
const key = localStorage.getItem('accessToken');
const options = {
  headers: {
    Authorization: `Bearer ${loadKey('refreshToken')}`,
  },
};
// Вызов функции рендера страницы по кнопке
// для десктопа
showFavoriteButtonEl1.addEventListener('click', e => {
  e.preventDefault();
  openModalWindow(addBackdropEl);
  getFavoritesList(URL, keyPart, options);
});
// для таблетки и мобилки
showFavoriteButtonEl2.addEventListener('click', e => {
  e.preventDefault();
  openModalWindow(addBackdropEl);
  getFavoritesList(URL, keyPart, options);
});

// Вызов функции закрытия модалки по кнопке
closeButtonEl.addEventListener('click', () => {
  closeModalWindow();
});
// Вызов функции закрытия модалки по Esc
document.addEventListener('keydown', closeModalByEsc);
// Вызов функции закрытия модалки по клику на бэкдроп(оверлей)
addBackdropEl.addEventListener('click', closeModalByOverlayClick);

// Функция вызова карточек товара для Обраного
function getFavoritesList(URL, keyPart, options) {
  return fetch(`${URL}${keyPart}`, options)
    .then(response => response.json())
    .then(response => putPicturesIntoHTML(fevoritesListEl, parsFavoritesList, response));
}
// Функция открытия модалки
function openModalWindow(el) {
  el.classList.toggle('visually-hidden', false);
}
//  Функция добавления списка картинок в HTML
function putPicturesIntoHTML(el, templateFunction, r) {
  el.insertAdjacentHTML('beforeend', templateFunction(r.favourites));
}
// Функция удаления зарендерых ранее элементов
function removeOldTegs(parentElement) {
  parentElement.innerHTML = '';
}
// Функция закрытия модалки
function closeModalWindow() {
  removeOldTegs(fevoritesListEl);
  addBackdropEl.classList.toggle('visually-hidden', true);
}
// Функция закрытия модалки по кнопке Esc
function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModalWindow();
  }
}
// Функция закрытия модалки по оверлею
function closeModalByOverlayClick(evt) {
  if (evt.target.classList.contains('add-backdrop')) {
    closeModalWindow();
  } else {
    return;
  }
}
