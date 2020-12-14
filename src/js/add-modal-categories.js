const BASE_URL = `https://callboard-backend.herokuapp.com`;
const addCategory = document.querySelector('.js-category-input');

addCategory.addEventListener('click', renderCategoriesList);

function fetchCategories() {
  return fetch(`${BASE_URL}/call/categories`)
    .then(res => {
      return res.json();
    }).
    
    catch(error => console.log(error));
  }

function renderCategoriesList() {
  let categoryMarkup = ``;
  // addCategory.innerHTML = ``;
  fetchCategories().then((categories) => {

    for (let category of categories){
      categoryMarkup += `<option value="">${category}</option> `;
      addCategory.insertAdjacentHTML('beforeend', categoryMarkup);
    }
    addCategory.insertAdjacentHTML('beforeend', categoryMarkup);
})
    .catch(error => console.log(error));
     
}