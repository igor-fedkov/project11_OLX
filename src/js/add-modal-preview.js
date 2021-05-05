const formImage = document.querySelector('.js-add-photo');
const labelImage = document.querySelector('.label-photo-btn');
const previewList = document.querySelector('.preview-list');

// formImage.addEventListener('change', () => {
//     uploadFile(formImage.files[0]);
// })

export default function uploadFile(file) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Тільки фото у форматі jpeg, png');
        formImage.value = '';
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        alert('Розмір фото має бути менше 2 MB');
        return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
        previewList.insertAdjacentHTML('afterbegin', `<li class="add-preview"><img src="${e.target.result}" alt="Photo" /></li>`);
    }
    if (previewList.children.length >= 5) {
        labelImage.classList.add('show-photo');
    }
    reader.onerror = function (e) {
        alert('Error!');
    };
    reader.readAsDataURL(file);
}


    
