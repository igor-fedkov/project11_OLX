const Handlebars = require('handlebars');

import sectionTpl from '../templates/section.hbs';
import categoryTpl from '../templates/main-page.hbs';

const API = 'https://callboard-backend.herokuapp.com/call';
const KEYMEIN = '?page=';
const KAYCATEGORY = '/specific/';
let page = 1;

const templateNames = {
  businessAndServices: 'Бізнес та послуги',
  electronics: 'Електроніка',
  free: 'Віддам безкоштовно',
  sales: 'Розпродаж',
  propetry: 'Нерухомість',
  recreationAndSport: 'Відпочинок і спорт',
  trade: 'Обмін',
  transport: 'Транспорт',
  work: 'Робота',
};

const refs = {
  logoEL: document.querySelector('.js-logo-open'),
  btnClearEL: document.querySelector('.js-btclean-filter'),
  mainContainerEL: document.querySelector('.js-render-main-page'),
  headerMenuEL: document.querySelector('.header-menu'),
  paginatorPagesEL: document.querySelector('.pagination-conteiner'),
};

document.addEventListener('DOMContentLoaded', homePageCreator);
refs.headerMenuEL.addEventListener('click', createCategoryMenu);
refs.logoEL.addEventListener('click', onLogoCLick);
refs.btnClearEL.addEventListener('click', onClearBtnClick);
refs.paginatorPagesEL.addEventListener('click', changePage);

function homePageCreator() {
  page = 1;
  getCard(page);
}

function onLogoCLick() {
  page = 1;
  getCard(page);
}

function onClearBtnClick() {
  page = 1;
  getCard(page);
}

async function createCategoryMenu(e) {
  if (e.target.nodeName !== "A") {
    return;
  }
  refs.paginatorPagesEL.classList.add('visually-hidden');
  clearArticlesContainer();
  const keyCategory = e.target.dataset.id;
  history.replaceState({ keyCategory }, ` ${keyCategory}`, `/${keyCategory}`);
  await postData(KAYCATEGORY, keyCategory).then(data => {
    // console.log('---', data);

    createCategoryMarkup(data, keyCategory, categoryTpl);
  });
}

async function postData(apiKey, arg) {
  const response = await fetch(API + apiKey + arg, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return await response.json();
}

async function getCard(page) {
  history.replaceState({ page }, `page: ${page}`, `/page=${page}`);
  refs.paginatorPagesEL.classList.remove('visually-hidden');
  clearArticlesContainer();

  await postData(KEYMEIN, page).then(data => {
    // console.log(data);
    renderMainContent(data);
  });
}

function changePage(e) {
  page = e.target.dataset.id;
  history.replaceState({ page }, `page: ${page}`, `/page=${page}`);
  const oldEl = document.querySelector(`.is-active`);
  oldEl.classList.remove('.is-active');
  e.target.classList.add('is-active');
  getCard(page);
}

function renderMainContent(data) {
  Object.keys(data).forEach(key => {
    createCategoryMarkup(data[key], key, sectionTpl);
    const btnLeftEL = document.querySelector(`#${key} .swipe-left`);
    const btnRightEL = document.querySelector(`#${key} .swipe-right`);
    const showAllEL = document.querySelector(`#${key} .show-all`);
    const position = { left: 0 };
    btnLeftEL.addEventListener('click', getLeft(key, position, +1));
    btnRightEL.addEventListener('click', getLeft(key, position, -1));
    showAllEL.addEventListener('click', showAll(key));
  });
}

function showAll(id) {
  return function () {
    history.replaceState({ id }, ` ${id}`, `/${id}`);
    const listCardEL = document.querySelector(`#${id} .card-field`);
    const headerCategoridEL = document.querySelector(`#${id} .header-categori`);
    const CategoridEL = document.querySelectorAll(`.section`);
    const CartConteinerEL = document.querySelector(`#${id} .card-container`);
    console.log(CartConteinerEL);
    CartConteinerEL.classList.toggle('card-container-slider');
    listCardEL.classList.replace('card-field', 'card-field-wrap');
    headerCategoridEL.classList.add('visually-hidden');
    for (let i = 0; i < CategoridEL.length; i += 1) {
      if (CategoridEL[i].id != id) {
        CategoridEL[i].classList.add('visually-hidden');
      }
    }
  };
}

function getLeft(id, position, arg) {
  return function (e) {
    const listCardEL = document.querySelector(`#${id} .card-field`);
    const CardEL = document.querySelector(`#${id} .card-item`);
    position.left = position.left + arg * (CardEL.offsetWidth + 20);
    if (position.left === -listCardEL.offsetWidth || position.left === listCardEL.offsetWidth) {
      e.preventDefault();
    }
    listCardEL.style.left = position.left + 'px';
  };
}

function createCategoryMarkup(arg, key, templ) {
  if (arg.length === 0) {
    return;
  }
  refs.mainContainerEL.insertAdjacentHTML(
    'beforeend',
    templ({ data: arg, name: templateNames[key], id: key }),
  );
}

function clearArticlesContainer() {
  refs.mainContainerEL.innerHTML = '';
}
