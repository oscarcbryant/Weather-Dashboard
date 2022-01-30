
var cityForm = document.querySelector("#cityForm");
var weatherCard = document.createElement('div');
var resultCard = document.getElementById("result-card");
var todaysCard = document.getElementById("todays-card");
var todaysDate = moment().format("dddd MMMM Do");
$('#result-card').text(todaysDate);


 function displayTodaysWeather(event) {

    event.preventDefault();
    var cityInput = document.querySelector("#city-input");

    console.log(cityInput);


    var cityName = cityInput.value;

    var todaysWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=4179e5cc6475d590cdcc3a798210bd52'

    fetch(todaysWeather)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function(data) { // 5day /3hrs 40objects= 1day 8object * 3 = 24hrs
            console.log(data);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=4179e5cc6475d590cdcc3a798210bd52`) 
                .then(function(response) {
                    if (response.ok) {
                        return response.json()
                    }
                })
                .then(function(data) {
                console.log(data)
                todaysUV.innerHTML = "UV Index: " + data.current.uvi; 
                if (data.current.uvi < .5) {
                    return todaysUV.style.backgroundColor = 'green';
                } else if (data.current.uvi >= .5 && data.current.uvi <= 1); {
                    return todaysUV.style.color = 'black', todaysUV.style.backgroundColor = 'yellow';
                }
            })
            .then(function(data) {
                fetch
            })

            todaysCard.classList.add('card', 'bg-dark', 'text-light');
    
    var todaysCity = document.createElement('h3');
    todaysCity.textContent = data.name;

    // var todaysDate = document.createElement('p');
    // todaysDate.innerHTML = data.dt_txt;

    
    
    // todaysDate.innerHTML = data.dt_txt;

    var todaysIcon = document.createElement("div");
    todaysIcon.innerHTML = `<img src=http://openweathermap.org/img/w/${data.weather[0].icon}.png></img>`;

    console.log(todaysDate);

    var todaysTemp = document.createElement("p");
    todaysTemp.innerHTML = "Temp: " + data.main.temp + "F";

    var todaysWind = document.createElement('p');
    todaysWind.innerHTML = "Wind: " + data.wind.speed;

    var todaysHum = document.createElement('p');
    todaysHum.innerHTML = "Humidity: " + data.main.humidity + "%";

    var todaysUV = document.createElement("p");

    todaysCard.append(todaysCity, todaysIcon, todaysDate, todaysTemp, todaysWind, todaysHum, todaysUV);

    

        }) 
  }

 
   
  function displayFutureWeather(weather, cityObj) {

    displayHeading();  

    weatherCard.classList.add('bg-light', 'text-dark', 'col-2');

    var cityTitleEl = document.createElement('h3');
    cityTitleEl.textContent = cityObj.name;

    var windContentEl = document.createElement('p');
    windContentEl.innerHTML = "Wind Speed: " + weather.wind.speed + "Mph";

    var weatherIcon = document.createElement("div");
    weatherIcon.innerHTML = `<img src=http://openweathermap.org/img/w/${weather.weather[0].icon}.png></img>`;


    var humidity = document.createElement('p');
    humidity.innerHTML = "Humidity: " + weather.main.humidity + "%";

    var temperature = document.createElement('p');
    temperature.innerHTML = "Temperature: " + weather.main.temp + " degrees";

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML = weather.dt_txt;
    
    weatherCard.append(cityTitleEl, weatherIcon, bodyContentEl, windContentEl, humidity, temperature);
    resultCard.append(weatherCard);

}



function callApi(event) {
    event.preventDefault();
    var cityInput = document.querySelector("#city-input");

    console.log(cityInput);


    var cityName = cityInput.value;
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=4179e5cc6475d590cdcc3a798210bd52";

    fetch(weatherUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function(data) { // 5day /3hrs 40objects= 1day 8object * 3 = 24hrs
            console.log(data);
            //console.log(user);
            var city = data.city;
            // loop thru the data, increment +8th 40/8 =5days
            // build cards, headings, paragraph; add the textContent
            // append to the forecast container
           // if (!user) {
              //  resultCard.innerHTML = '<h3>No results found, please search again!</h3>'
           // } else {
                weatherCard.textContent = "";
                for (var i = 0; i < data.list.length; i+= 8) {
                    console.log(i);
                    
                    displayFutureWeather(data.list[i], city);
                }
                })
                  
        }
       
        function displayHeading() {

            var heading = document.createElement('h2');
            heading.innerHTML = "5-Day Forecast";
        
          }
        
        
    
            
   // cardContent.innerHTML = cityInput;

    //cityCard.append(cardContent);
//}
function generateCity (event) {
    event.preventDefault();

   var cityInput = document.querySelector("#user").value;
 
    if (!cityInput) {

        console.log("we need a value, champion!");
        return;
    }
    console.log(cityInput);
}


//displayCity();

cityForm.addEventListener('submit', callApi);
cityForm.addEventListener('submit', displayTodaysWeather);
cityForm.addEventListener('submit', displayHeading);

// function createParagraph(text)
// {
//     var element = document.createElement('p');
//     element.innerHTML = text;
//     return element;
// }

// var windContentEl = createParagraph("Wind: " + weather.wind.speed + "MPH");
// var uvContentEl = createParagraph("UV Index: " + weather.pop);