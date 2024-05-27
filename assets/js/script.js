// scripts.js
const weatherApi = 'f04be44694b5a8d0bf6454eaa0e1646b'; // Replace with your OpenWeatherMap API key

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
        addCityToHistory(city);
        saveCity(city);
    }
});

function fetchWeather(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=imperial`;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${weatherApi}&units=imperial`;

    fetch(currentWeatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayCurrentWeather(data);
        });

    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayForecast(data);
        });
}

function displayCurrentWeather(data) {
    let weatherDetails = `
        <h3>${data.name} (${new Date().toLocaleDateString()})</h3>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon" class="weather-icon">
        <p>Temperature: ${data.main.temp} °F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} MPH</p>
    `;
    document.getElementById('current-weather-details').innerHTML = weatherDetails;
}

function displayForecast(data) {
    let forecastDetails = '';
    for (var i = 0; i < data.list.length; i += 8) {
        let forecast = data.list[i];
        forecastDetails += `
            <div class="forecast-item card p-2">
                <h4>${new Date(forecast.dt_txt).toLocaleDateString()}</h4>
                <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="weather icon" class="weather-icon">
                <p>Temperature: ${forecast.main.temp} °F</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind Speed: ${forecast.wind.speed} MPH</p>
            </div>
        `;
    }
    document.getElementById('forecast-details').innerHTML = forecastDetails;
}

function addCityToHistory(city) {
    let historyList = document.getElementById('history-list');
    let cityItem = document.createElement('li');
    cityItem.classList.add('list-group-item');
    
    let cityLink = document.createElement('a');
    cityLink.href = '#';
    cityLink.textContent = city;
    cityLink.addEventListener('click', function(event) {
        event.preventDefault();
        fetchWeather(city);
    });

    cityItem.appendChild(cityLink);
    historyList.appendChild(cityItem);
}

function saveCity(city) {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

function loadCity() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(function(city) {
        addCityToHistory(city);
    });
}

// Load cities from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadCity);