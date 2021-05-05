const axios = require('axios').default;

const BASE_URL = "https://callboard-backend.herokuapp.com";

export function getUser(accessToken) {
	return axios(`${BASE_URL}/user`, { headers: { Authorization: `${accessToken}` } })
		.then(res => console.log(res))
		.catch(error => {
			console.log(error);
		})	
}

export function login(email, password) {	
	return axios.post(`${BASE_URL}/auth/login`, {
			"email": `${email}`,
			"password": `${password}`
		})
		.then(({ data }) => data)
}

export function registration(email, password) {
	return axios.post(`${BASE_URL}/auth/register`, {
		"email": `${email}`,
		"password": `${password}`
	})
		.then(data => data)
}

export function logout(accessToken) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'authorization': `${accessToken}`,
		},
	};
	return axios(`${BASE_URL}/auth/logout`, options)
		.then(data => data);
}

export default {login, registration, getUser, logout};