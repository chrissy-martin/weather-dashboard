var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
var currentCity= [];
var searchButton = document.getElementById("search");
var searchHistory = document.getElementById("search-history");
var citySearch = document.getElementById("city-search");
var searchList = document.getElementById("search-list")
var historyList = [];


var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
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
       //weather icon
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
  function fiveDayForecast(city) {
    
    // var currentCity = $('#current-city').val().trim();
    //     futureForecast= $('#current-city').val();
    var forecastURL="https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
      
    
        fetch(forecastURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            for (let i = 0; i < 6; i++) {
                var temp;
                var icon;
                var wind;
                var humidity;
            
                temp = data.temp;
                icon = weatherIcon;
                wind = data.wind.speed;
                humidity = data.humidity;
            };

            var weatherIcon = data.weather[0].icon;
            var iconURL = `https://openweathermap.org/img/w/${weatherIcon}.png`;
    
            var futureForecast = $(`
              <div class="card">
                <h2 id="current-city">
                ${data.name} ${data.main.dt_txt} <img src="${iconURL}" alt="${data.weather[0].description}" />
                </h2>
                      <div class="card-body">
                           <p>Temperature: ${data.main.temp} °F</p>
                            <p>Humidity: ${data.main.humidity}\%</p>
                            <p>Wind Speed: ${data.wind.speed} MPH</p>
                        </div>
                <div>
            `);
    
        $("#five-day").append(futureForecast);
        });
      }
      
 
//     var forecastURL= `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${APIKey}`;
    
//     $.ajax({
//         url: forecastURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);
//         $("#five-day").empty();

//         for (let i = 1; i < 6; i++) {
//             var weatherInfo = {
//                 date: response.daily[i].dt,
//                 icon: response.daily[i].weather[0].icon,
//                 temp: response.daily[i].temp.day,
//                 humidity: response.daily[i].humidity,
//                 windSpeed: response.daily[i].wind.speed
//             };

//             var currDate = moment.unix(weatherInfo.date).format("MM/DD/YYYY");
//             var iconURL = `<img src="https://openweathermap.org/img/w/${weatherInfo.icon}.png" alt="${response.daily[i].weather[0].main}" />`;

            
//             var futureForecast = $(`
//                 <div class="card">
//                     <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
//                         <div class="card-body">
//                             <h4>${currDate}</h4>
//                             <p>${iconURL}</p>
//                             <p>Temp: ${weatherInfo.temp} °F</p>
//                             <p>Humidity: ${weatherInfo.humidity}\%</p>
//                             <p>Wind Speed: ${weatherInfo.windSpeed}MPH%</p>
                            
//                         </div>
//                     </div>
//                 <div>
//             `);

//             $("#five-day").append(futureForecast);
//         }
//     }); 

//   }
  searchButton.addEventListener('click', fiveDayForecast);





  

    // futureForecast= $('#current-city').val().trim();
    // var forecastURL="https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&appid=" + APIKey;
    
    // $.ajax({
    //     url: forecastURL,
    //     method: 'GET',
    //   }).then(function (response) {
    //     console.log('Ajax Reponse \n-------------');
    //     console.log(response);
       
        
    //     for (let i = 1; i < 6; i++) {
    //         var temp;
    //         var icon;
    //         var wind;
    //         var humidity;

    //         temp = data.daily[i].temp.day;
    //         icon = data.daily[i].weather[0].icon;
    //         wind = data.daily[i].wind_speed;
    //         humidity = data.daily[i].humidity;

            
    //     var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;
        
    //     var fiveDay= $(`
    //         <h2 id="five-day">
    //             ${response.name} ${response.dt_txt} <img src="${iconSrc}" alt="${response.weather[0].description}" />
    //         </h2>
    //         <p>Temperature: ${data.main.temp} °F</p>
    //         <p>Humidity: ${data.main.humidity}\%</p>
    //         <p>Wind Speed: ${data.wind.speed} MPH</p>
    //     `);

    //     $("#five-day").append(fiveDay);
    //     }

    //   });
    // }

    //var previousSearch = JSON.parse(localStorage.getItem("searches"));






//     var city = $('#current-city').val().trim();
//     futureForecast= $('#current-city').val();
//     var forecastURL="https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=" + APIKey;
  
//     fetch(forecastURL)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);

//         var weatherIcon = data.weather.icon;
//         var iconSrc = `https://openweathermap.org/img/w/${weatherIcon}.png`;

//         var futureForecast = $(`
//             <h2 id="five-day">
//                 ${data.name} ${data.dt_txt} <img src="${iconSrc}" alt="${data.weather[0].description}" />
//             </h2>
//             <p>Temperature: ${data.main.temp} °F</p>
//             <p>Humidity: ${data.main.humidity}\%</p>
//             <p>Wind Speed: ${data.wind.speed} MPH</p>
//         `);

//     $("#five-day").append(futureForecast);
//     });
//   }
  
