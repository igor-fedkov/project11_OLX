// const axios = require('axios').default;
const addForm = document.querySelector('.add-modal-form');
const photoElem = document.querySelector('.js-add-photo');
const addBtn = addForm.querySelector('.add-modal-btn');
const closeModalBtn = document.querySelector('[add-modal-close]');

// const addPhoto = addForm.querySelector('.js-add-photo');
const accessToken = localStorage.getItem('accessToken');

const formData = new FormData();
const myHeaders = new Headers();
addForm.addEventListener('submit', onFormSubmit);
  photoElem.addEventListener('input', function () {
    formData.append('file', photoElem.files[0]);
  });
async function onFormSubmit(e) {
  e.preventDefault();
  // const addName = addForm.querySelector('.js-add-name');
  // const addDescr = addForm.querySelector('.js-add-description');
  // const addCategory = document.querySelector('.js-category-input');
  // const addPrice = addForm.querySelector('.js-add-price');
  // const addPhone = addForm.querySelector('.js-add-phone');
  const formElements = e.currentTarget.elements;
  // console.log(formElements);
  const title = formElements.title.value;
    const description = formElements.description.value;
    const category = formElements.category.value;
    const price = formElements.price.value;
    const phone = formElements.phone.value;
  // const title = addName.value;
  // const description = addDescr.value;
  // const category = addCategory.value;
  // const price = addPrice.value;
  // const phone = addPhone.value;
  formData.append('title', title);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('price', Number(price));
  formData.append('phone', phone);
  console.log(formData);
  myHeaders.append('Authorization', `Bearer ${accessToken}`);
  const URL = 'https://callboard-backend.herokuapp.com/call';
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders,
    body: formData,
  };
  const answer = await fetch(URL, requestOptions);
  if (answer.ok) {
    // closeModalBtn.click();
    alert('Ваше оголошення успішно опубліковане');
    addForm.reset();
  }
}

// console.dir(addForm);
// validateBtn.addEventListener('click', () => {
//     let data = new FormData(addForm);
//     let config = {
//         formMethod: 'POST',
//         url: 'https://callboard-backend.herokuapp.com/call',
//         headers: { 
//             'accept': 'application/json', 
//             formEncType: 'multipart/form-data',
//         //   'Content-Type': 'multipart/form-data', 
//           Authorization: accessToken,
//         },
//         data: data
//       };
//       axios(config)
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
// })