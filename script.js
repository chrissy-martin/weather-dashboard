var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
var currentCity=" ";
var lastCity = " ";
var searchButton = document.getElementById("search");
var searchHistory = document.getElementById("search-history");
var citySearch = document.getElementById("city-search");


 
function getCurrentWeather(city) {
    var city = $('#city-search').val().trim();
    currentCity= $('#city-search').val();
    var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var weatherIcon = data.weather[0].icon;
        var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;

        var currentCity = $(`
            <h2 id="current-city">
                ${data.name} <img src="${iconSrc}" alt="${data.weather[0].description}" />
            </h2>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Humidity: ${data.main.humidity}\%</p>
            <p>Wind Speed: ${data.wind.speed} MPH</p>
        `);

        $("#current-city").append(currentCity);
      });
        

  }

  function fiveDayForecast() {
    futureForecast= $('#current-city').val();
    var forecastURL="https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=" +
    APIKey;
  
    fetch(forecastURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var weatherIcon = data.weather[0].icon;
        var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;

        var futureForecast = $(`
            <p id="five-day">
                ${data.name} <img src="${iconSrc}" alt="${data.weather[0].description}" />
            </p>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Humidity: ${data.main.humidity}\%</p>
            <p>Wind Speed: ${data.wind.speed} MPH</p>
        `);

    $("#current-city").append(futureForecast);
    });

  }
  searchButton.addEventListener('click', getCurrentWeather);


 
 
