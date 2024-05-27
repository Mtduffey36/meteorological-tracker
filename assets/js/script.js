const weatherApi = 'f04be44694b5a8d0bf6454eaa0e1646b' //this is my API key
const cardsContainer = document.getElementById('card');
const todayContainer = document.getElementById('current');
const forecastHeader = document.getElementById('forecast');


document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const city = document.getElementById('cityNameInput').value;
    if (city) {
        addCityToHistory(city);
        saveToLocal(city);
        current(city);
        forecast(city);
    } else {
        (cityNameInput === "")
        alert('Please Enter City Name!');
    }
})

function addCityToHistory(city) {
    const historyList = document.getElementById('history-list');
    const cityItem = document.createElement('li'); 
    const cityLink = document.createElement('a');
    // const historyBtn = document.createElement('button');
    cityItem.classList.add('list-group-item');
    cityLink.href = '#'
    cityItem.textContent = city;
    cityLink.addEventListener('click', function (event) {
        event.preventDefault();
        current(city);
        forecast(city);
    });
    historyList.appendChild(cityItem);
    cityItem.appendChild(cityLink)
}

function saveToLocal(city) {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

function loadCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(function(city) {
        addCityToHistory(city);
    });
}

document.addEventListener('DOMContentLoaded', loadCities);

//Calls api information for the current weather
function current(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=imperial`, {
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
    fetch(`http://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${weatherApi}&units=imperial`, {
        
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
            // console.log(forecastData);
            forecastCard(forecastData)
        }
    })
}

function currentCard(currentData) {
    console.log("inside currentCard function", currentData);
    const currentArea = document.getElementById('currentArea')
    const nameEl = document.createElement('h3');
    const tempEl = document.createElement('li');
    const windEl = document.createElement('li');
    const humidityEl = document.createElement('li');
    const iconEl = document.createElement('img');
console.log('current data name', currentData.name);
    nameEl.innerText = currentData.name;
    tempEl.innerText = currentData.temp + ' ºF';
    windEl.textContent = currentData.wind + ' MPH';
    humidityEl.textContent = currentData.humidity + ' %';
    iconEl.src = `https://openweathermap.org/img/w/${currentData.icon}.png`

    nameEl.append(tempEl);
    nameEl.append(windEl);
    nameEl.append(humidityEl);
    nameEl.append(iconEl);
    currentArea.append(nameEl);

    // addend h3, the append the li onto h3, then append the h3 onto something in html
    // console.log(currentCard);

}

function forecastCard(forecastData) {
    console.log("inside forecastCard function", forecastData);
    const forecastArea = document.getElementById('forecastArea')
    const dateEl = document.createElement('h3');
    const tempEl = document.createElement('li');
    const windEl = document.createElement('li');
    const humidityEl = document.createElement('li');
    const iconEl = document.createElement('img');

// need new append, need to take name out
    dateEl.innerText = forecastData.date;
    tempEl.innerText = forecastData.temp + ' ºF';
    windEl.textContent = forecastData.wind + ' MPH';
    humidityEl.textContent = forecastData.humidity + ' %';
    iconEl.src = `https://openweathermap.org/img/w/${forecastData.icon}.png`

    dateEl.append(tempEl);
    dateEl.append(windEl);
    dateEl.append(humidityEl);
    dateEl.append(iconEl);
    forecastArea.append(dateEl);

    console.log(forecastCard);
}


//need "for loop" for search history, button needs event listener. 




