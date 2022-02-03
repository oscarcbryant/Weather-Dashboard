
var cityForm = document.querySelector("#cityForm");
var resultCard = document.getElementById("result-card");
var todaysCard = document.getElementById("todays-card");
var searchButton = document.querySelector("#search-button");

let cityInput = document.querySelector('#city-input')

 function displayTodaysWeather(cityName) {

    todaysCard.innerHTML = "";

    var todaysWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4179e5cc6475d590cdcc3a798210bd52`

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
    var container = document.createElement('div')
    container.style.display = 'flex';
    container.style.alignItems = 'center';

    var todaysCity = document.createElement('h3');
    todaysCity.textContent = data.name;
    todaysCity.style.marginRight = '10px';

    var todaysDate = document.createElement('h3');
    todaysDate.innerHTML = " (" + Intl.DateTimeFormat("default", {day: "2-digit", month: 'long', year: '2-digit'} ).format(new Date()) + ") ";

    var todaysIcon = document.createElement("div");
    todaysIcon.innerHTML = `<img src=http://openweathermap.org/img/w/${data.weather[0].icon}.png></img>`;

    container.append(todaysCity, todaysDate, todaysIcon);

    console.log(todaysDate);

    var todaysTemp = document.createElement("p");
    todaysTemp.innerHTML = "Temp: " + data.main.temp + "F";

    var todaysWind = document.createElement('p');
    todaysWind.innerHTML = "Wind: " + data.wind.speed;

    var todaysHum = document.createElement('p');
    todaysHum.innerHTML = "Humidity: " + data.main.humidity + "%";

    var todaysUV = document.createElement("p");
    todaysUV.style.width = '120px';

    todaysCard.append(container, todaysTemp, todaysWind, todaysHum, todaysUV);

    

        }) 
  }

 
   
  function displayFutureWeather(weather, cityObj) {

    var weatherCard = document.createElement('div');


    var container = document.createElement('div')
    container.style.display = 'flex';
    container.style.alignItems = 'center';

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



function callApi(cityName) {

    var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

    searchHistory.unshift(cityName);

    localStorage.setItem('search-history', JSON.stringify(searchHistory));

    displayTodaysWeather(cityName);
  
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4179e5cc6475d590cdcc3a798210bd52`;

    fetch(weatherUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function(data) {
            var city = data.city;
            
            resultCard.innerHTML = "";
                for (var i = 0; i < data.list.length; i+= 8) {
                    displayFutureWeather(data.list[i], city);
                }
        })
}

        function getSearchHistory(){

            

            var pastSearch = document.querySelector("#past-search")
            pastSearch.innerHTML = "";

            searchHistory = JSON.parse(localStorage.getItem("search-history"))
            console.log(searchHistory);
            for(i=0; i < searchHistory.length; i++){
            var btn = document.createElement('button')
            btn.innerText = searchHistory[i] 
            btn.setAttribute('type', 'button');
            btn.addEventListener('click', function(event){
                console.log(event.target.innerText);
                callApi(event.target.innerText);
            });
        
            pastSearch.appendChild(btn);

                    }
        } 


searchButton.addEventListener('click', getSearchHistory);
searchButton.addEventListener('click', () => callApi(cityInput.value));