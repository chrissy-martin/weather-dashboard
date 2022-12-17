var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
 var city;

 var queryURL="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
 
 fetch(queryURL)