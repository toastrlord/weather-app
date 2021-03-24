'use strict'

const apiCallStart = 'https://api.openweathermap.org/data/2.5/onecall?';
const apiCallEnd = getAPIKey();
const cityData = loadCityData();
const countryCodes = loadCountryCodes();
const stateCodes = loadStateCodes();

async function loadCountryCodes() {
    try {
        const response = await fetch('country_codes.json');
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

async function loadStateCodes() {
    try {
        const response = await fetch('us_states.json');
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

async function getAPIKey() {
    try {
        const response = await fetch('api_key.txt');
        const apiKey = await response.text();
        const result = `&appid=${apiKey}`;

        return result;
    }
    catch(error) {
        console.log(error);
    }
}

async function loadCityData() {
    try {
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
        const loadedCountryCodes = await countryCodes;
        const loadedStateCodes = await stateCodes;
        const citiesWithCountry = (await cities).map(city => {
            const country = loadedCountryCodes[city.country];
            if (city.hasOwnProperty('state')) {
                const state = loadedStateCodes[city.state];
                return {name: city.name, state, country, coord: city.coord};
            }
        
            return {name: city.name, country, coord: city.coord};
        });

        return citiesWithCountry;
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


