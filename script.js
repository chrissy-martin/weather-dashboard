var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
var currentCity=[];
var lastCity = " ";
var searchButton = document.getElementById("search");
var searchHistory = document.getElementById("search-history");
var citySearch = document.getElementById("city-search");
var searchList = document.getElementById("search-list")
var historyList =[];


 
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
    if (!historyList.includes(city)) {
        historyList.push(city);
        var  history= $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#search-list").append(history);
    };
    
    localStorage.setItem("city", JSON.stringify(currentCity));
      console.log(currentCity); 

   
    });


  function fiveDayForecast(futureForecast) {
    futureForecast= $('#current-city').val().trim();
    var forecastURL="https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&appid=" + APIKey;
    
    $.ajax({
        url: forecastURL,
        method: 'GET',
      }).then(function (response) {
        console.log('Ajax Reponse \n-------------');
        console.log(response);
        $("#five-day").empty();
        
        for (let i = 1; i < 6; i++) {
            var futureForecast = $(`
            <h2 id="five-day">
                ${response.name} ${response.dt_txt} <img src="${iconSrc}" alt="${response.weather[0].description}" />
            </h2>
            <p>Temperature: ${response.main.temp} °F</p>
            <p>Humidity: ${response.main.humidity}\%</p>
            <p>Wind Speed: ${response.wind.speed} MPH</p>
        `);

            
        var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;
        
        $("#five-day").append(futureForecast);
        }

      });
    }








    // var city = $('#current-city').val().trim();
    // futureForecast= $('#current-city').val();
    // var forecastURL="https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=" + APIKey;
  
    // fetch(forecastURL)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     console.log(data);

    //     var weatherIcon = data.weather.icon;
    //     var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;

    //     var futureForecast = $(`
    //         <h2 id="five-day">
    //             ${data.name} ${data.dt_txt} <img src="${iconSrc}" alt="${data.weather[0].description}" />
    //         </h2>
    //         <p>Temperature: ${data.main.temp} °F</p>
    //         <p>Humidity: ${data.main.humidity}\%</p>
    //         <p>Wind Speed: ${data.wind.speed} MPH</p>
    //     `);

    // $("#five-day").append(futureForecast);
    // });

  
  
  //searchButton.addEventListener('click', getCurrentWeather);
  searchButton.addEventListener('click', fiveDayForecast);

  //.val(localStorage.getItem
 
