import { login, registration, getUser, logout } from './API-login-and-registration';
import { loadKey, saveKey, deleteKey } from './local-storage';
import { onCloseMenu } from './menu';

const debounce = require('lodash.debounce');

const refs = {
	modalLogAndReg: document.querySelector("[data-modal-log-and-reg]"),
	buttonsModalLogAndReg: document.querySelectorAll(".js-btn-log-and-reg"),
	containerMyOffice: document.querySelectorAll(".my-office"),
	buttonsMyOffice: document.querySelectorAll(".js-my-office-btn"),
	btnLogout: document.querySelector(".js-btn-go-out"),
	bodyEl: document.querySelector("body"),
	groupButtonsMyOffice: document.querySelectorAll('.my-office'),
	listItemsMyOffice: document.querySelectorAll('.js-list-my-off'),
};

const notifications = {
	emailEmpty: "Необходимо ввести логин",
	passwordEmpty: "Необходимо ввести пароль",
	wrongEmail: "Не правильный логин",
	wrongLoginOrPassword: "Не правильный логин или пароль",
	loginAlreadyExist: "Пользователь с таким логином уже зарегистрирован",
	passwordShort: "Минимальная длина пароля - 8 символов",
	passwordLong: "Максимальная длина пароля - 16 символов",
	passwordWithoutDigits: "Пароль должен содержать цифры",
	passwordMustContainSmallAndBigLetters: "Пароль должен содержать большие и малые буквы",
	passwordWithSpaces: "Пароль не должен содержать пробелов"
}

const emailInputEl = refs.modalLogAndReg.querySelector('.email-input');
const passwordInputEl = refs.modalLogAndReg.querySelector(".password-input");
const btnGoogleAutorisation = refs.modalLogAndReg.querySelector(".btn-google-autorisation");
const btnLogin = refs.modalLogAndReg.querySelector(".btn-login");
const btnRegistration = refs.modalLogAndReg.querySelector(".btn-registration");
const btnCloseModal = refs.modalLogAndReg.querySelector(".close-button");
const notificationErrorEmailEl = refs.modalLogAndReg.querySelector(".notification-error-email");
const notificationErrorPasswordEl = refs.modalLogAndReg.querySelector(".notification-error-password");

refs.modalLogAndReg.addEventListener('click', onBackdrop);
refs.bodyEl.addEventListener('keydown', onPressEsc);
refs.buttonsModalLogAndReg.forEach(btn => btn.addEventListener('click', onBtnLogAndRegModal));
refs.btnLogout.addEventListener('click', onBtnLogout);
refs.buttonsMyOffice.forEach(btn => btn.addEventListener('click', onBtnMyOffice));
btnGoogleAutorisation.addEventListener('click', onBtnGoogleAutorisation);
btnRegistration.addEventListener('click', onBtnRegistration);
btnLogin.addEventListener('click', onBtnLogin);
btnCloseModal.addEventListener('click', onBtnLogAndRegModal);
emailInputEl.addEventListener('input', () => onInputValue());
passwordInputEl.addEventListener('input', () => onInputValue());

function onBackdrop(event) {
	if (event.target === refs.modalLogAndReg) {
		toggleModal(refs.modalLogAndReg);
	}
}

function onPressEsc(event) {
	if (event.keyCode === 27 && !refs.modalLogAndReg.classList.contains('visually-hidden')) {
		toggleModal(refs.modalLogAndReg);
	}
}

function onBtnLogAndRegModal() {
	toggleModal(refs.modalLogAndReg);
	onCloseMenu();
}

//Проверка проходила-ли авторизация Google или это новое открытое окно
if (loadKey('googleAutorusation') === true) {
	const str = location.search.substr(1).split('&');
	const accessToken = str[0].slice(str[0].indexOf('=') + 1);
	const refreshToken = str[1].slice(str[1].indexOf('=') + 1);
	const id = str[2].slice(str[2].indexOf('=') + 1);

	saveKey('accessToken', accessToken);
	saveKey('refreshToken', refreshToken);
	saveKey('id', id);

	getUser(accessToken);
	deleteKey('googleAutorusation');
	location.search = '';
}

// const tmp = loadKey('accessToken');
// console.log(tmp);
// debugger;
if (loadKey('accessToken') != undefined) {
	chengeVisibilityElementsByLoginAndLogout();
}

function onBtnGoogleAutorisation() {
	saveKey('googleAutorusation', true);
}

function onBtnRegistration(event) {
	event.preventDefault();

	if (!validationEmail(emailInputEl.value)) {
		errorEmail(notifications.wrongEmail);
		return;
	}

	if (!validationPassword(passwordInputEl.value)) {
		return;
	}

	onRegistration(emailInputEl.value, passwordInputEl.value);
	onLogin(emailInputEl.value, passwordInputEl.value);
}

async function onRegistration(email, password) {
	await registration(email, password)
		.then(({ id }) => {
			saveKey('id', id);
		})
		.catch(error => {
			if (error.response.status === 409) {
				errorEmail(notifications.loginAlreadyExist);
			}
			else {
				console.log(`error = ${error.response.status}`);
			}
		});
}

function onBtnLogin(event) {
	event.preventDefault();
	
	if (emailInputEl.value.length == 0) {
		errorEmail(notifications.emailEmpty);
		return;
	}

	if (passwordInputEl.value.length == 0) {
		errorPassword(notifications.passwordEmpty);
		return;
	}
	// console.log("on btn login");
	onLogin(emailInputEl.value, passwordInputEl.value);
}

async function onLogin(email, password) {
	await login(email, password)
		.then(({ accessToken, refreshToken, sid }) => {
			saveKey('accessToken', accessToken);
			saveKey('refreshToken', refreshToken);
			saveKey('id', sid);
			chengeVisibilityElementsByLoginAndLogout();
			toggleModal(refs.modalLogAndReg);
		})
		.catch(error => {
			if (error.response.status === 403) {
				errorEmail(notifications.wrongLoginOrPassword);
			}
			console.log(error);
		});
}

function onBtnLogout(event) {
	onLogout(loadKey('accessToken')); 

	chengeVisibilityElementsByLoginAndLogout();
}

async function onLogout(accessToken) {
	localStorage.clear();	
	await logout(accessToken)
		.then((data) => {
			localStorage.clear();
			return true;
		})
		.catch(error => {
			console.log(error);
			return false;
		})
}

function onBtnMyOffice() {
	refs.listItemsMyOffice.forEach(btn => btn.classList.toggle('visually-hidden'));
}

function chengeVisibilityElementsByLoginAndLogout() {
	refs.groupButtonsMyOffice.forEach(btn => btn.classList.toggle('visually-hidden'));
	refs.buttonsModalLogAndReg.forEach(btn => btn.classList.toggle('visually-hidden'));
}

const onInputValue = debounce(() => {
	notificationErrorEmailEl.classList.add("visually-hidden");
	notificationErrorPasswordEl.classList.add("visually-hidden");
}, 1000);

function toggleModal(modal) {
	clearInputData();
	modal.classList.toggle('visually-hidden');
}

function validationEmail(email) {
	const PATTERN_VALIDATION_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return PATTERN_VALIDATION_EMAIL.test(email);
}

function validationPassword(password) {
	const MIN_LENGTH = 8;
	const MAX_LENGTH = 16;
	const PRESENT_DIGIT = /\d/;
	const PRESENT_BIG_LETER = /[A-Z]/;
	const PRESENT_SMALL_LETER = /[a-z]/;
	const NO_SPACES = /\S/;

	if (password.length < MIN_LENGTH) {
		errorPassword(notifications.passwordShort);
		return false;
	}
	if (password.length > MAX_LENGTH) {
		errorPassword(notifications.passwordLong);
		return false;
	}
	if (!PRESENT_DIGIT.test(password)) {
		errorPassword(notifications.passwordWithoutDigits);
		return false;
	}
	if (!PRESENT_BIG_LETER.test(password) || !PRESENT_SMALL_LETER.test(password)) {
		errorPassword(notifications.passwordMustContainSmallAndBigLetters);
		return false;
	}
	if (!NO_SPACES.test(password)) {
		errorPassword(notifications.passwordWithSpaces);
		return false;
	}
	
	return true;
}

function errorEmail(notification) {
	notificationErrorEmailEl.textContent = notification;
	notificationErrorEmailEl.classList.remove("visually-hidden");
}

function errorPassword(notification) {
	notificationErrorPasswordEl.textContent = notification;
	notificationErrorPasswordEl.classList.remove("visually-hidden");
}

function clearInputData() {
	emailInputEl.value = "";
	passwordInputEl.value = "";
}


