const BASE_URL = `https://callboard-backend.herokuapp.com`;
const addCategory = document.querySelector('.js-category-input');

addCategory.addEventListener('click', renderCategoriesList);
// Функция запрос на бэк по категориям, массив в ответе
function fetchCategories() {
  return fetch(`${BASE_URL}/call/categories`)
    .then(res => {
      return res.json();
    }).
    
    catch(error => console.log(error));
}
//Функция добавляет разметку выпадающего списка в модалку "Додати оголошення"
function renderCategoriesList() {
  let categoryMarkup = ``;
  fetchCategories().then((categories) => {
    for (let category of categories){
      categoryMarkup += `<option value="${category}" class="js-add-category">${category}</option> `;
    }
    addCategory.insertAdjacentHTML('beforeend', categoryMarkup);
    addCategory.removeEventListener('click', renderCategoriesList);
   })
    .catch(error => console.log(error));
}