function talkToApiServer(URL, keyPart, options) {
  return fetch(`${URL}${keyPart}`, {
    method: '',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(options),
  })
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(error => console.log(error.message));
}
export default talkToApiServer;
