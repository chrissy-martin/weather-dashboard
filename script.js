var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
var currentCity=" ";
var lastCity = " ";
var searchButton = document.getElementById("search");
var searchHistory = document.getElementById("search-history");
var citySearch = document.getElementById("city-search");
var searchList = document.getElementById("search-list")


 
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
        // Get icons and values for current city
        var weatherIcon = data.weather[0].icon;
        var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;

        var currentCity = $(`
            <h2 id="current-city">
                ${data.name} ${data.dt_txt} <img src="${iconSrc}" alt="${data.weather[0].description}" />
            </h2>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Humidity: ${data.main.humidity}\%</p>
            <p>Wind Speed: ${data.wind.speed} MPH</p>
        `);

        $("#current-city").append(currentCity);
      });

      
      localStorage.setItem("city", JSON.stringify(currentCity));
      console.log(currentCity);  

  }

  function fiveDayForecast(lat, lon) {
    var lat = $('#current-city').val();
    var lon = $('#current-city').val();
    futureForecast= $('#current-city').val();
    var forecastURL="https://api.openweathermap.org/data/2.5/weather?" + lat + "=35&" + lon + "=139&APPID=" +
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
            <h2 id="five-day">
                ${data.name} ${data.date} <img src="${iconSrc}" alt="${data.weather[0].description}" />
            </h2>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Humidity: ${data.main.humidity}\%</p>
            <p>Wind Speed: ${data.wind.speed} MPH</p>
        `);

    $("#five-day").append(futureForecast);
    });

  }
  searchButton.addEventListener('click', getCurrentWeather);


 
 
