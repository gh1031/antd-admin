
function checkStatus(response) {
  if (response.status >=200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default  function request(url, params) {
  return fetch(url, params)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => { return data })
    .catch(err => { return err })
}