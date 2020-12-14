import selesTpl from '../templates/sales-section.hbs';
import recreationAndSportTpl from '../templates/recreationAndSport-section.hbs';
import freeTpl from '../templates/sales-section.hbs';
import businessAndServicesTpl from '../templates/businessAndServices-section.hbs';

const refs = {
  logoEL: document.querySelector('.js-logo-open'),
  mainContainerEL: document.querySelector('.js-render-main-page'),
};
// console.log(refs.logoEL);
// console.log(refs.mainContainerEL);

refs.logoEL.addEventListener('click', getCard);

const API = 'https://callboard-backend.herokuapp.com/call?page=';
let page = 1;

async function postData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return await response.json();
}

function getCard(e) {
  console.log('Клик был, функция запущена');

  e.preventDefault();

  postData(API + page).then(data => {
    console.log(data);
  });
}

//  incrementPage() {
//     page += 1;
//   }

//   resetPage() {
//     page = 1;
//   }

// function appendArticlesMarkup(hits) {
//   refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
// }

// function clearArticlesContainer() {
//   refs.articlesContainer.innerHTML = '';
// }
