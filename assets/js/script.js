// const openWeatherUrl = 'https://api.openweathermap.org';
// const weatherAPI = 'f04be44694b5a8d0bf6454eaa0e1646b';

// const input = document.getElementById('input');
// const cityNameInput = document.getElementById('cityNameInput');
// const SubmitBtn = document.getElementById('submitBtn');

// const searchHistory = document.getElementById('searchHistory');

// const cityName = document.getElementById('cityName');
// const dayTime = document.getElementById('dayTime');
// const dayWind = document.getElementById('dayWind');
// const dayHumidity = document.getElementById('dayHumidity');

// const forecast = document.getElementById('forecast');

// // dayjs.extend(window.dayjs_plugin_utc);
// // dayjs.extend(window.dayjs_plugin_timezone);


// // function saveInput () {
// //     const cityList = JSON.parse(localStorage.getItem("cityList"));
     
// //      const post = {
// //         inputValue: inputValue.value.trim(),
// //      };
   
// //      if(cityList === null){
// //          localStorage.setItem("cityList", JSON.stringify([post])); 
// //      } else { 
// //          cityList.push(post);
       
// //          localStorage.setItem("List", JSON.stringify(blogList));
// //      }; 
// //  };

// //   document.addEventListener('DOMContentLoaded', function() {
// //     document.querySelector('button').addEventListener('#submitBtn', function(event) {
// //         event.preventDefault();
// //     })
// //   });

//   function validateCity() {
//     const city = document.querySelector('input').value.trim();

//     if (city === "") {
//         alert("Please Enter a City!");
//         return false;
//     };
//     return true;
//   };

// document.getElementById('submitBtn').addEventListener('click', function(event) {
//     event.preventDefault();
//     const forecast = getForecastByCity(cityNameInput.value.trim())
//     const coords = getLocationByCity(cityNameInput.value.trim());

// })

// async function getLocationByCity(cityNameInput) {
//     const cityApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityNameInput}&appid=${weatherAPI}`;
//     const response = await fetch(cityApi);
    

//     const data = response.json();
//     // console.log(data);
//     const coords = {
//         latitude: [0].lat,
//         longitude: [0].lon,
//     };

// }

// async function getForecastByCity(cityName) {
//     const forecastAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherAPI}`;
//     const fResponse = await fetch(forecastAPI);

//     const fData = fResponse.json();
//     console.log(fData);

//     const forecast = {
//         temp: fData.list[0].main.temp,
//         humidity: fData.list[0].main.humidity,
//     }

// }

const weatherApi = 'f04be44694b5a8d0bf6454eaa0e1646b' //this is my API key
const cardsContainer = document.getElementById('card');
const todayContainer = document.getElementById('current');
const forecastHeader = document.getElementById('forecast');






document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const city = document.getElementById('cityNameInput').value;
    if (city) {
        // addCityToHistory(city);
        // saveToLocal(city);
        current(city);
        forecast(city);
    } else {
        (cityNameInput === "")
        alert('Please Enter City Name!');
    }
})



// function addCityToHistory(city) {
//     const historyList = document.getElementById('history-list');
//     const cityItem = document.createElement('li'); 
//     const cityLink = document.createElement('a');
//     cityItem.classList.add('list-group-item');
//     cityLink.href = '#'
//     cityItem.textContent = city;
//     cityLink.addEventListener('click', function (event) {
//         event.preventDefault();
//         current(city);
//         forecast(city);
//     });
//     historyList.appendChild(cityItem);
//     cityItem.appendChild(cityLink)
// }

// function saveToLocal(city) {
//     const cities = JSON.parse(localStorage.getItem('cities')) || [];
//     if (!cities.includes(city)) {
//         cities.push(city);
//         localStorage.setItem('cities', JSON.stringify(cities));
//     }
// }

// function loadCities() {
//     const cities = JSON.parse(localStorage.getItem('cities')) || [];
//     cities.forEach(function(city) {
//         addCityToHistory(city);
//     });
// }

document.addEventListener('DOMContentLoaded', loadCities);


//Calls api information for the current weather
function current(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`, {
}) 
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {

    let currentData = {
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].icon
    }
    // console.log(data);
    // console.log(currentData);
    currentCard(currentData);
  }) 
}
// calls api information for the forecast
function forecast(city) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${weatherApi}`, {
        
})
    .then(function (response) {
        return response.json();
        
    })
    .then(function (data) {

        for (let i = 0; i <= 32; i += 8) {
            forecastData = {
                date: data.list[i].dt_txt,
                temp: data.list[i].main.temp,
                humidity: data.list[i].main.humidity,
                wind: data.list[i].wind.speed,
                icon: data.list[i].weather[0].icon
            }
            // console.log(data);
            console.log(forecastData);
        }
    })
}



