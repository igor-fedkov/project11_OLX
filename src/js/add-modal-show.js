const refs = {
  openModalBtn: document.querySelector('#add-modal-open'),
  closeModalBtn: document.querySelector('[add-modal-close]'),
  addModal: document.querySelector('#add-backdrop-for-ad'),
  ModalAuth: document.querySelector('#data-modal-log-and-reg'),
};

refs.openModalBtn.addEventListener('click', addModalOpen);
// закрытие модалки через кнопку
refs.closeModalBtn.addEventListener('click', modalClose);

// закрытие модалки по Esc
document.addEventListener('keydown', modalEscClose);

// зактрытие по оверлэю
refs.addModal.addEventListener('click', onModalBackdropClick);

// Функция открытия модалки
function addModalOpen(evt) {
  evt.preventDefault();
  if (localStorage.getItem('accessToken') !== null) {
    refs.addModal.classList.remove('visually-hidden');
  } else {
    refs.ModalAuth.classList.remove('visually-hidden');
  }
}

// Функции закрытия модалки
function modalClose() {
  refs.addModal.classList.add('visually-hidden');
}
function modalEscClose(evt) {
  if (evt.key === 'Escape') {
    modalClose();
  }
}
function onModalBackdropClick(evt) {
  // console.log(evt.target);
  // console.log(evt.target.attributes.class.nodeValue);
  // if (evt.target.attributes.class.nodeValue === 'add-backdrop js-add-modal') {
  //   modalClose();
  // }
  // if (evt.target.attributes.class === undefined) {
  //   return;
  // }
  if (evt.target.classList.contains('js-add-modal')) {
    modalClose();
  } else {
    return;
  }
}
