const cityInput = document.querySelector("#city-input");
const button = document.querySelector("#city-button");
const mainCity = document.querySelector("#main-city");
const mainTemp = document.querySelector("#main-temp");
const mainWind = document.querySelector("#main-wind");
const mainHum = document.querySelector("#main-hum");
const mainUVI = document.querySelector("#main-uvi");
//will need to revisit this part of code to ensure i use a for loop, instead of hardcoding all these repetitive variables
const dateOne = document.querySelector("#date-one");
const oneTemp = document.querySelector("#one-temp");
const oneWind = document.querySelector("#one-wind");
const oneHum = document.querySelector("#one-humidity");

const dateTwo = document.querySelector("#date-two");
const twoTemp = document.querySelector("#two-temp");
const twoWind = document.querySelector("#two-wind");
const twoHum = document.querySelector("#two-humidity");

const dateThree = document.querySelector("#date-three");
const threeTemp = document.querySelector("#three-temp");
const threeWind = document.querySelector("#three-wind");
const threeHum = document.querySelector("#three-humidity");

const dateFour = document.querySelector("#date-four");
const fourTemp = document.querySelector("#four-temp");
const fourWind = document.querySelector("#four-wind");
const fourHum = document.querySelector("#four-humidity");

const dateFive = document.querySelector("#date-five");
const fiveTemp = document.querySelector("#five-temp");
const fiveWind = document.querySelector("#five-wind");
const fiveHum = document.querySelector("#five-humidity");

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
      console.log(weather);
      currEmoji(weather);
      fdForecast(weather);
      
    })
    .catch(error => console.log('error', error));
}

function currEmoji(weather) {
  //get emoji for current weather
  let status = weather.current.weather[0].main;
  let emoji = ""
  if (status === "Thunderstorm") {
    emoji = "⛈"
  } else if (status === "Drizzle") {
    emoji = "🌧"
  } else if (status === "Rain") {
    emoji = "☔"
  } else if (status === "Snow") {
    emoji = "❄"
  } else if (status === "Sunny") {
    emoji = "☀"
  } else if (status ==="Clouds") {
    emoji = "☁"
  } emoji = "🌪"
  console.log(emoji);
  currentForecast(weather, emoji);
}

function currentForecast(weather, emoji) {
  

  mainCity.textContent = `${cityInput.value}   ${emoji}`;
  mainTemp.textContent = `Temp: ${weather.current.temp}°F`;
  mainWind.textContent = `Wind: ${weather.current.wind_speed}mph`;
  mainHum.textContent = `Humidity: ${weather.current.humidity}%`;
  mainUVI.textContent = `UV Index: ${weather.current.uvi}`;
}

//function to add weather object data into each card for 5 day forecast
//start on the second day, as the current day has already been captured in main dashboard

function fdForecast(weather) {
  console.log(weather.daily[1].dt);
  console.log(weather.daily[1].temp.day);
  console.log(weather.daily[1].wind_speed);
  console.log(weather.daily[1].humidity);

  //unix date conversion was taken from codesource.io. epoch date needs to * 1000 for formula to work
  let unixDate1 = (weather.daily[1].dt)*1000;

  let formattedDate1 = (new Intl.DateTimeFormat("en-us").format(unixDate1));

  let unixDate2 = (weather.daily[2].dt)*1000;

  let formattedDate2 = (new Intl.DateTimeFormat("en-us").format(unixDate2));

  let unixDate3 = (weather.daily[3].dt)*1000;

  let formattedDate3 = (new Intl.DateTimeFormat("en-us").format(unixDate3));

  let unixDate4 = (weather.daily[4].dt)*1000;

  let formattedDate4 = (new Intl.DateTimeFormat("en-us").format(unixDate4));

  let unixDate5 = (weather.daily[5].dt)*1000;

  let formattedDate5 = (new Intl.DateTimeFormat("en-us").format(unixDate5));


  dateOne.textContent = formattedDate1;
  oneTemp.textContent = `Temp: ${weather.daily[1].temp.day}°F`;
  oneWind.textContent = `Wind: ${weather.daily[1].wind_speed}mph`;
  oneHum.textContent = `Humidity: ${weather.daily[1].humidity}%`;

  dateTwo.textContent = formattedDate2;
  twoTemp.textContent = `Temp: ${weather.daily[2].temp.day}°F`;
  twoWind.textContent = `Wind: ${weather.daily[2].wind_speed}mph`;
  twoHum.textContent = `Humidity: ${weather.daily[2].humidity}%`;

  dateThree.textContent = formattedDate3;
  threeTemp.textContent = `Temp: ${weather.daily[3].temp.day}°F`;
  threeWind.textContent = `Wind: ${weather.daily[3].wind_speed}mph`;
  threeHum.textContent = `Humidity: ${weather.daily[3].humidity}%`;

  dateFour.textContent = formattedDate4;
  fourTemp.textContent = `Temp: ${weather.daily[4].temp.day}°F`;
  fourWind.textContent = `Wind: ${weather.daily[4].wind_speed}mph`;
  fourHum.textContent = `Humidity: ${weather.daily[4].humidity}%`;

  dateFive.textContent = formattedDate5;
  fiveTemp.textContent = `Temp: ${weather.daily[5].temp.day}°F`;
  fiveWind.textContent = `Wind: ${weather.daily[5].wind_speed}mph`;
  fiveHum.textContent = `Humidity: ${weather.daily[5].humidity}%`;
  
}



//event listeners for button
button.addEventListener("click", fetchCoord);
// // code for enter from StackOverflow
// cityInput.addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {}}, fetchCoord);