const openWeatherUrl = 'https://api.openweathermap.org';
const weatherAPI = 'f04be44694b5a8d0bf6454eaa0e1646b';

const input = document.getElementById('input');
const cityNameInput = document.getElementById('cityNameInput');
const SubmitBtn = document.getElementById('submitBtn');

const searchHistory = document.getElementById('searchHistory');

const cityName = document.getElementById('cityName');
const dayTime = document.getElementById('dayTime');
const dayWind = document.getElementById('dayWind');
const dayHumidity = document.getElementById('dayHumidity');

const forecast = document.getElementById('forecast');

// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);


// function saveInput () {
//     const cityList = JSON.parse(localStorage.getItem("cityList"));
     
//      const post = {
//         inputValue: inputValue.value.trim(),
//      };
   
//      if(cityList === null){
//          localStorage.setItem("cityList", JSON.stringify([post])); 
//      } else { 
//          cityList.push(post);
       
//          localStorage.setItem("List", JSON.stringify(blogList));
//      }; 
//  };

//   document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('button').addEventListener('#submitBtn', function(event) {
//         event.preventDefault();
//     })
//   });

//   function validateCity() {
//     const city = document.getElementById('input').value.trim();

//     if (city === "") {
//         alert("Please Enter a City!");
//         return false;
//     };
//     return true;
//   };

document.getElementById('submitBtn').addEventListener('click', function() {
    console.log('here');
    const coords = getLocationByCity(cityNameInput.value.trim());

})

async function getLocationByCity(cityName) {
    const cityApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${weatherAPI}`
    const response = await fetch(cityApi);
    

    const data = response.json();
    console.log(data);
    const coords = {
        latitude: [0].lat,
        longitude: [0].lon,
    };
    console.log(coords);

}
