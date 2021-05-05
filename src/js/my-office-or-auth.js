import { loadKey } from './local-storage';

const buttonsLoginAndReg = document.querySelectorAll('.js-btn-log-and-reg');
const buttonsMyOffice = document.querySelectorAll('.my-office-btn');




// const Myoffice = document.querySelector('.btn-my-office');
// const ContainerMyoffice = document.querySelector('.my-office');
// const BtnLogandReg = document.querySelectorAll('.js-btn-log-and-reg');


/**
 * Функция обновляет состояние моего кабинета в зависимости от присутствия токена в locallstorage
 * функция должна вызываться при кажном обновленном состояния токена
 */

//  function UpdateOfficeBtnByToken () {
//     if(localStorage.getItem('accessToken') === null){
//         BtnLogandReg[0].classList.remove('itsAuth');
//         BtnLogandReg[1].classList.remove('itsAuth');
//         ContainerMyoffice.classList.add('itsAuth');
//         // Myoffice.classList.add('itsAuth');
//     } else {
        
//         BtnLogandReg[0].classList.add('itsAuth');
//         BtnLogandReg[1].classList.add('itsAuth');
//         ContainerMyoffice.classList.remove('itsAuth');
//         // Myoffice.classList.remove('itsAuth');
//     }
// }



// function UpdateOfficeBtnByToken() {
//     // const tmp = loadKey('accessToken');
//     // debugger;
//     if (loadKey('accessToken')) {

//         buttonsMyOffice.forEach(btn => {
//             btn.classList.remove('visually-hidden');
//         })
//         buttonsLoginAndReg.forEach(btn => {
//             btn.classList.add('visually-hidden');
//         })
//         return;
//     }

//     buttonsMyOffice.forEach(btn => {
//         btn.classList.add('visually-hidden');
//     })
//     buttonsLoginAndReg.forEach(btn => {
//         btn.classList.remove('visually-hidden');
//     })
// }

// UpdateOfficeBtnByToken();
// export default  UpdateOfficeBtnByToken;
    