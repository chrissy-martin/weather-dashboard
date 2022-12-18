var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
var city=" ";
var searchButton = document.getElementById("search");
var searchHistory = document.getElementById("datalistOptions")

 
function getApi() {
 
    var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
  searchButton.addEventListener('click', getApi);


 