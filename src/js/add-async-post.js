import uploadFile from './add-modal-preview';
import addFormValidate from './add-modal-valid';
// const axios = require('axios').default;
// import axios from "axios";
const BASE_URL = `https://callboard-backend.herokuapp.com`; 
const addForm = document.querySelector('.add-modal-form');
const formImage = document.querySelector('.js-add-photo');
const previewList = document.querySelector('.preview-list');
const labelImage = document.querySelector('.label-photo-btn');
const addButton = document.querySelector('.add-modal-btn');
const addModal = document.querySelector('.js-add-modal');

addButton.addEventListener('click', addFormSend);
formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
})
async function addFormSend(e) {
  e.preventDefault();
    removeValidation();
  let addModalError = addFormValidate(addForm);
  const accessToken = sessionStorage.getItem('token');

  if (addModalError === 0) {
    const formdata = new FormData(addForm);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${accessToken}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://callboard-backend.herokuapp.com/call/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        Close();
      })
      .catch(error => console.log('error', error));
  } else {
    alert('Заповніть будь-ласка всі поля');
  }
}
function Close() {
  addModal.classList.add('visually-hidden');
};
// Функция удаления фото из списка по щелчку
previewList.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        const remove = confirm('Видалити фото?');
        if (remove) {
          e.target.parentNode.remove();
        }
        if (previewList.children.length <= 5) {
        labelImage.classList.remove('show-photo');
    }
    }
    console.log(e.target);
});
// Функция очистки формы от сообщений валидации
function removeValidation() {
    let errorsValid = addForm.querySelectorAll('.add-valid-error');
   // console.log(errorsValid);
    for (let i = 0; i < errorsValid.length; i++) {
        errorsValid[i].remove();
    } 
}