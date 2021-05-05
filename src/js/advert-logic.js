const axios = require('axios').default;

const refs ={
    btnInfoSeller: document.querySelector('.js-info-seller'),
    info: document.querySelector('.js-info'),
    infoSeller: document.querySelector('.js-seller-on'),
    infoSellerTime: document.querySelector('.js-seller-time'),
    infoSellerTel: document.querySelector('.js-seller-tel'),
  
}
// console.dir(refs.favorBtn);

refs.btnInfoSeller.addEventListener('click', showSellerInfo);


function showSellerInfo(evt) {
    refs.info.classList.toggle('visually-hidden');
    refs.btnInfoSeller.classList.toggle('seller');
    refs.infoSeller.classList.toggle('visually-hidden');
    // sellerInfoRender(evt);
}

const BASE_URL = `https://callboard-backend.herokuapp.com/user/`;

const key = localStorage.getItem('accessToken');

export default async function getUserInform (userId) {	
	return await axios.get(`${BASE_URL}${userId}`,{
        headers: {
          'Content-Type': 'application/json',
        
          Authorization: `${key}`,
        },
          
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
      })
		.then(({ data }) => sellerInfoRender(data))
}

function sellerInfoRender (data) {
    refs.infoSellerTime.textContent =`На OLX с ${data.registrationDate}`;
    refs.infoSellerTel.textContent = `email: ${data.email}`;
    // console.log(data.email);
    // console.log(data.registrationDate);
}
function getCardInfoFromServer(params) {
    
}