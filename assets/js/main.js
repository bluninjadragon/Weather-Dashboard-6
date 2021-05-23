const city = document.querySelector("#city");
const button = document.querySelector("#city-button");


function fetch() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("api.openweathermap.org/data/2.5/weather?q=Chicago&appid=1e9fe6b8a2be8c30b4ddc5a45ef6c932", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//event listeners for button
// button.forEach((btn) => btn.addEventListener("click", fetch));
fetch();