var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
var currentCity= [];
var searchButton = document.getElementById("search");
var searchHistory = document.getElementById("search-history");
var citySearch = document.getElementById("city-search");
var searchList = document.getElementById("search-list")
var historyList = [];
var lat = [];
var lon = [];


 //get current weather data for current city and display on screen
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

        lat = data.coord.lat;
        lon = data.coord.lon;

        var weatherIcon = data.weather[0].icon;
        var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;

        var currentCity = $(`
            <h2 id="current-city">
                ${data.name} ${data.main.dt_txt} <img src="${iconSrc}" alt="${data.weather[0].description}" />
            </h2>
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Humidity: ${data.main.humidity}\%</p>
            <p>Wind Speed: ${data.wind.speed} MPH</p>
        `);

        $("#current-city").append(currentCity);
      }); 

  }

// add search history to local storage
$("#search").on("click", function(event) {
    event.preventDefault();

    var city = $("#city-search").val().trim();
    getCurrentWeather(city);
    fiveDayForecast();
    if (!historyList.includes(city)) {
        historyList.push(city);
        var  history= $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#search-list").append(history);
    };
    
    localStorage.setItem("city", JSON.stringify(currentCity));
      console.log(currentCity); 

     //add event listener to search history list so they are now like buttons
    $('#search-list').on("click", (event) => {
        event.preventDefault();
        $('#city-search').val(event.target.textContent);
        currentCity=$('#city-search').val();
        getCurrentWeather(event);
    });

});

//make last city searched be on screen 

   
//get 5 day forecast data and display on screen
  function fiveDayForecast() {
    
    // var currentCity = $('#current-city').val().trim();
    //     futureForecast= $('#current-city').val();
    var forecastURL="https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
      
    
        fetch(forecastURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

           
            
        // var weatherIcon = data.list[i].icon;
       
          
            for (let i = 2; i < data.list.length; i+= 8) {
                var temp = data.list[i].main.temp;
                var icon = data.list[i].weather[0].icon;
                var wind = data.list[i].wind.speed;
                var humidity = data.list[i].main.humidity;
                // var iconSrc = `https://openweathermap.org/img/w/${icon}.png`;

                var forecastCard = $("<div>");
                forecastCard.addClass("card-body");
                // var tempEl = $("<p>");
                forecastCard.append(icon);
                forecastCard.append(temp);
                forecastCard.append(humidity);
                forecastCard.append(wind);
                 $("#five-day").append(forecastCard);  
            };
   
          });
        }