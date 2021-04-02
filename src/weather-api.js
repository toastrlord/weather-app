'use strict'

const apiCallStart = 'https://api.openweathermap.org/data/2.5/onecall?';
const apiCallEnd = getAPIKey();
const cityData = loadCityData();
const countryCodes = loadCountryCodes();
const stateCodes = loadStateCodes();

async function fetchData(dataLocation, retrievalFunction) {
    try {
        const response = await fetch(dataLocation, {mode: 'cors'});
        const result = await response[retrievalFunction]();

        return result;
    }
    catch(error) {
        console.log(error);
    }
}

async function loadCountryCodes() {
    return fetchData('country_codes.json', 'json');
}

async function loadStateCodes() {
    return fetchData('us_states.json', 'json');
}

async function getAPIKey() {
    const apiKey = await fetchData('api_key.md', 'text');
    return `&appid=${apiKey}`;
}

async function loadCityData() {
    return fetchData('city_list.json', 'json');
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
        maxTemp: data.temp.max,
        minTemp: data.temp.min,
        units: 'F',
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


