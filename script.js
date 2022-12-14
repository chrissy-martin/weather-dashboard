var APIKey = "db7246c26dae7066dbd3873f47ec1b21";
//API call for key
api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
 
//API call for city/Country
https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
 var city;

 var queryURL="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
 
 fetch(queryURL)