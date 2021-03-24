'use strict'

const apiCallStart = 'https://api.openweathermap.org/data/2.5/onecall?';
const apiCallEnd = getAPIKey();
const cityData = loadCityData();
const countryCodes = loadCountryCodes();

async function loadCountryCodes() {
    const response = await fetch('country_codes.json');
    const result = await response.json();

    return result;
}

async function getAPIKey() {
    const response = await fetch('api_key.txt');
    const apiKey = await response.text();
    const result = `&appid=${apiKey}`;
    return result;
}

async function loadCityData() {
    try {
        console.log('loading');
        const response = await fetch('city.list.json', {mode: 'cors'});
        const cityData = await response.json();
        return cityData;
    }
    catch (error) {
        console.log(error);
    }
}

async function findCities(name) {
    const lowercaseName = name.toLowerCase().trim();
    try {
        const cities = (await cityData).filter((city) => {
            return city.name.toLowerCase() === lowercaseName;
        });
        
        return cities;
    }
    catch(error) {
        console.log(error);
    }
}

function processWeatherData(data) {
    return {
        weatherDescription: data.weather[0].main,
        clouds: data.clouds,
        humidity: data.humidity,
        rain: data.rain,
        maxTemp: Math.round(parseFloat(data.temp.max)),
        minTemp: Math.round(parseFloat(data.temp.min)),
    };
}

async function fetchWeatherData(city) {
    try {
        const apiMiddle = `lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly&units=imperial`;
        const url = `${apiCallStart}${apiMiddle}${await apiCallEnd}`;
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData.daily.map(city => processWeatherData(city));
    }
    catch(error) {
        console.log(error);
    }
}

export {findCities, fetchWeatherData};


