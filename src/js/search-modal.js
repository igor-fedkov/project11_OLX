
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import cardTpl from '../templates/cardSM.hbs';
import { Utils } from "handlebars";

defaults.delay = 100;
defaults.icon = false;
defaults.styling = 'material';
class NewsApiService {
  constructor() {
  this.searchQuery = '';
  this.page = 1;       
  }    
  incrementPage() {
    this.page += 1;
    // console.log('this.page+1:', this.page);
  }
  resetPage() {
    this.page = 1;
    // console.log('this.page home:', this.page);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
}};

const newsApiService=new NewsApiService();

const searchObject = document.querySelector(".input-searchS");
//console.log("searchObject:",searchObject);
const searchBtn=document.querySelector('.bBtn');
const closeBtn = document.querySelector('.aBtn');
const modalBtn = document.querySelector('#search-modal');
// console.log(modalBtn);
const sentinelS=document.querySelector(".sentinel");

modalBtn.addEventListener('click', onOpenModal); 
const foneModalS = document.querySelector('.fone-modalS');
const backdropS=document.querySelector('.backdropS');

modalBtn.addEventListener('click', onOpenModal);  
searchBtn.addEventListener('click', onSearch);

const mainContainerEL= document.querySelector('.js-render-main-page');

// console.log("searchBtn:",searchBtn);
// console.log("mainContainerEL:",mainContainerEL);

const API = 'https://callboard-backend.herokuapp.com/call/find?search=';

function onOpenModal(evt) { 
  
  evt.preventDefault();  

  const modalBtn=evt.target; 

  //console.log("modalBtn.parentElement.nodeName:",evt.target.parentElement.nodeName);

  if (evt.target.parentElement.nodeName !== 'BUTTON') {
    return;
  }  
  backdropS.classList.remove('visually-hidden');  
  
  window.addEventListener('keydown', onEscKeyPress);  
  closeBtn.addEventListener('click', onCloseModal,{once:true});  
  backdropS.addEventListener('click', onOverlay, { once: true });
};

function onSearch(e) {

// console.log('Клик был, функция onSearch запущена!!!!');
  newsApiService.query=searchObject.value;
  //console.dir(newsApiService.query.length);
  if (newsApiService.query === '') {
    return alert('Enter search parameters!');   
  }
  
 
  newsApiService.resetPage();      
    clearContainer();
    document.getElementById('mySearch').value = "";
  //console.dir(newsApiService.query);
  
  return postData(API + newsApiService.query).then(data => {
    appendMarkup(data); 
    newsApiService.incrementPage(); 
  //  console.log(data); 
   
   
  }).catch(error=>{
    console.log();
  }) 
};

async function postData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    
  });
  return await response.json();
};

function onEscKeyPress(evt) {
  const ESC_Key_Code = 'Escape';
  const isESCKey = evt.code === ESC_Key_Code;
  if (isESCKey) {
    onCloseModal();    
  }
};

function onCloseModal() {  
  backdropS.classList.add('visually-hidden');  
  window.removeEventListener('keydown', onEscKeyPress);
};

function onOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  onCloseModal()
};

function appendMarkup(arg) {
  if (arg.length === 0) {
    return alert('Nothin found');
  }
  mainContainerEL.insertAdjacentHTML('afterbegin', cardTpl(arg));
  // mainContainerEL.innerHTML = "<h1>Работает</h1>";
  // console.log(cardTpl(arg));
  onCloseModal(); 
};

function clearContainer() {
  mainContainerEL.innerHTML = '';
};
