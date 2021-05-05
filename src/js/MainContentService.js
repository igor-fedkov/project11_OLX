const LOAD_CONTENT_URL = 'https://callboard-backend.herokuapp.com/call?page=';

export default class Service {
  async loadMainContent(page = 1) {
    const response = await fetch(LOAD_CONTENT_URL + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return await response.json();
  }
}
