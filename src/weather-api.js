'use strict'

const apiKey = '056fbaeb5e0ac21a223f3af28f256fc7';
const apiCallStart = 'https://api.openweathermap.org/data/2.5/onecall?';
const apiCallEnd = `&appid=${apiKey}`;
const cityData = loadCityData();

async function loadCityData() {
    try {
        const response = await fetch('city.list.json', {mode: 'cors'});
        const cityData = await response.json();
        return cityData;
    }
    catch {error} {
        console.log(error);
    }
}

async function findCities(name) {
    const lowercaseName = name.toLowerCase().trim();
    
    const cities = (await cityData).filter((city) => {
        return city.name.toLowerCase() === lowercaseName;
    });
    return cities;
}

function processWeatherData(data) {
    const daily = data.daily;
    return daily.map((dayData) => {
        return {
            clouds: dayData.clouds,
            humidity: dayData.humidity,
            rain: dayData.rain, 
            temp: dayData.temp,
        };
    });
}

async function fetchWeatherData(city) {
    try {
        const apiMiddle = `lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly&units=imperial`;
        const response = await fetch(`${apiCallStart}${apiMiddle}${apiCallEnd}`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(processWeatherData(weatherData.map(data => processWeatherData)));
    }
    catch(error) {
        console.log(error);
    }
}

export {findCities, fetchWeatherData};


