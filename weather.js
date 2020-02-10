
//container 1, Using querySelector to get the class name where we should modify.
const iconElement = document.querySelector(".weather-icon")
const temperatureElement = document.querySelector(".temperature-value p")
const describeElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

// container 2, same as above but the other container for city name search. 
const  iconElement2 = document.querySelector(".weather-icon.other ")
const temperatureElement2 = document.querySelector(".temperature-value.other p")
const describeElement2 = document.querySelector(".temperature-description.other p")
const locationElement2 = document.querySelector(".location.other p")
const notificationElement2 = document.querySelector(".notification.other ")



// appliation data.
const weather = {};

weather.temperature = {
    unit : "celsius"
}


//define a constant reference to use later in methods.

const Kelvin = 273;

/**
 * 2 API keys, first is used for geolocation using longitude and latitude 
 *  second is used to get weather databy city name.
 */
const ApiKey = "1f05eb452ea4ae015dfeb3492c72e0f0";
const ApiKey2 = "1fd34f16c976c5e2daf26dd070f371bd";


/**
 *  returns the element object representing the element whose id represented
 * in html as a string.
 */
function myFunction() {
    var autocomplete = document.getElementById("search-input").value;
    getWeather2(autocomplete);
}


/**
 * check if the browse suppports geolocation.
 */
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notificationElement.style.display = "block;";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";

}

/**
 * set users position
 */
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}


/**
 * shows error if an issue with geolocation service if exist.
 */
function showError(error){
notificationElement.style.display = "block";
notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

/**
 * get the weather using apikey.
 */
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}`;
       
    fetch(api)
        .then(function (response){
            let data = response.json();
            return data;
        })

        .then (function (data){
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
        })

        .then(function(){
            displayWeather();
           
        });
    
}

/**
 * gets the weather from api provider by city name.
 */
function getWeather2(cityName){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey2}`
       
    fetch(api)
        .then(function (response){
            let data2 = response.json();
            return data2;
        })

        .then (function (data2){
            weather.temperature.value = Math.floor(data2.main.temp - Kelvin);
                weather.description = data2.weather[0].description;
                weather.iconId = data2.weather[0].icon;
                weather.city = data2.name;
                weather.country = data2.sys.country;
        })

        .then(function(){
            displayWeather2();
           
        });

}


/**
 * displays the weather to user interface. Mathed with first container.
 */
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    describeElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

/**
 * displays the weather to user interface. Mathed with second container.
 */
function displayWeather2(){
    iconElement2.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temperatureElement2.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    describeElement2.innerHTML = weather.description;
    locationElement2.innerHTML = `${weather.city}, ${weather.country}`;
}       

/**
 * convert from celsius to fahrenheit.
 */
function celsiusToFehrenhrit(temperature){
    return (temperature * 9/5 ) + 32;

}


/**
 * Using listner to recognize when user clicks on temperature 
 * temperature will change to fahrenheit. Just for the first container.
 */

temperatureElement.addEventListener("click", function(){


    if ( weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFehrenhrit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        temperatureElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit"
        
    }

    else{
        temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
})