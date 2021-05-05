import uploadFile from './add-modal-preview';
import addFormValidate from './add-modal-valid';
import { loadKey } from './local-storage';
import axios from "axios";
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
function addFormSend(evt) {
    evt.preventDefault();
    removeValidation();
    let addModalError = addFormValidate(addForm);
    if (addModalError === 0) {
      let formData = new FormData(addForm);
      let config = {
        method: 'POST',
        url: `${BASE_URL}/call`,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${loadKey('refreshToken')}`
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQyNmU5MDAwMzE5MzAwMTdlOTE2OGIiLCJzaWQiOiI1ZmUwNWY3ZDAzMGZmMDAwMTcxMmNlZTIiLCJpYXQiOjE2MDg1NDAwMjksImV4cCI6MTYxMTE2ODAyOX0.uaKSqxHI02Be0hIy5igHUWegXDEYnNC_vM8YvYhQRLk'
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQzMzYxZjgwZGFiZDAwMTc5ZDdmZjYiLCJzaWQiOiI1ZmRlNDU5YzY0NTAxYjAwMTczMDhlMjMiLCJpYXQiOjE2MDg0MDIzMzIsImV4cCI6MTYxMTAzMDMzMn0.T641pOQOQK8bjVy0o5YwUJP0BnkGxx0tIG3_4EplJ0s'
        },
        data: formData,
      };
        axios(config)
        .then(function (response) {
          console.log(response.data);
          Close();
      })
      .catch(function (error) {
        console.log(error);
      });
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
