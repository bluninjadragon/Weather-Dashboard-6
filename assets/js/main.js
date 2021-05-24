const cityInput = document.querySelector("#city-input");
const button = document.querySelector("#city-button");
const mainCity = document.querySelector("#main-city");
const mainTemp = document.querySelector("#main-temp");
const mainWind = document.querySelector("#main-wind");
const mainHum = document.querySelector("#main-hum");
const mainUVI = document.querySelector("#main-uvi");
const dateOne = document.querySelector("#date-one");
const oneTemp = document.querySelector("#one-temp");
const oneWind = document.querySelector("#one-wind");
const oneHum = document.querySelector("#one-humidity");


function fetchCoord() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=1e9fe6b8a2be8c30b4ddc5a45ef6c932`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const data = JSON.parse(result);
      console.log(data);
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
      fetchWeather(lat, lon);
    })
    .catch(error => console.log('error', error)); 
}

//function to add weather object data to the CURRENT forecast in main card of dashbaord
function fetchWeather(lat, lon) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=1e9fe6b8a2be8c30b4ddc5a45ef6c932`, requestOptions)
    .then(response => response.text())
    .then(result => {
      const weather = JSON.parse(result);
      console.log(weather)
      mainCity.textContent = cityInput.value;
      mainTemp.textContent = `Temp: ${weather.current.temp}°F`;
      mainWind.textContent = `Wind: ${weather.current.wind_speed}mph`;
      mainHum.textContent = `Humidity: ${weather.current.humidity}%`;
      mainUVI.textContent = `UV Index: ${weather.current.uvi}`;

      fdForecast(weather);
    })
    .catch(error => console.log('error', error));
}

//function to add weather object data into each card for 5 day forecast
//start on the second day, as the current day has already been captured in main dashboard

function fdForecast(weather) {
  console.log(weather.daily[1].dt);
  console.log(weather.daily[1].temp.day);
  console.log(weather.daily[1].wind_speed);
  console.log(weather.daily[1].humidity);

  //unix date conversion was taken from codesource.io. epoch date needs to * 1000 for formula to work
  let unixDate = (weather.daily[1].dt)*1000;

  let formattedDate = (new Intl.DateTimeFormat("en-us").format(unixDate));


  dateOne.textContent = formattedDate;
  oneTemp.textContent = `Temp: ${weather.daily[1].temp.day}°F`;
  oneWind.textContent = `Wind: ${weather.daily[1].wind_speed}mph`;
  oneHum.textContent = `Humidity: ${weather.daily[1].humidity}%`;
  
}



//event listeners for button
button.addEventListener("click", fetchCoord);
// // code for enter from StackOverflow
// cityInput.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {}}, fetchCoord);