//Displays current temperature, condition, humidity, wind speed and date
function currentTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let symbolElement = document.querySelector("#symbol");

  symbolElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-symbol" />`;
  cityElement.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

//Formats date
function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minute}`;
}

//API for currrent weather
function searchCity(city) {
  let apiKey = "5bfa080034fb64td6b864b3a813efo04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(currentTemperature);
}

//Display searched city
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

//API for the forecast
function getForecast(city) {
  let apiKey = "5bfa080034fb64td6b864b3a813efo04";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function displayForecast(response) {
  let forecast = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast =
        forecast +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div class="weather-forecast-symbol"> <img src="${
              day.condition.icon_url
            }" class="weather-forecast-symbol" /> </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecast;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("New York");
