'use strict'

const apiKey = '056fbaeb5e0ac21a223f3af28f256fc7';
const apiCallStart = 'https://api.openweathermap.org/data/2.5/onecall?';
const apiCallEnd = `&appid=${apiKey}`;
const submitButton = document.querySelector('#submit-button');
const cityInputBox = document.querySelector('#city-name');
const stateInputBox = document.querySelector('#state');
const countryInputBox = document.querySelector('#country');
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

async function findCity(name, state = String.empty, country = String.empty) {
    const lcName = name.toLowerCase().trim();
    const lcState = state === undefined ? String.empty : state.toLowerCase().trim();
    const lcCountry = country === undefined ? String.empty : country.toLowerCase().trim();

    function compareCity(city) {
        const nameMatches = city.name.toLowerCase() === lcName;
        function stateMatches() {
            if (!lcState) {
                return true;
            }
            return (city.hasOwnProperty('state') && city.state.toLowerCase() === lcState);
        }
        function countryMatches() {
            if (!lcCountry) {
                return true;
            }
            return (city.hasOwnProperty('country') && city.country.toLowerCase() === lcCountry);
        }

        return nameMatches && stateMatches() && countryMatches();
    }
    
    // TODO: return all cities that match the criteria
    const city = (await cityData).find((city) => {
        return compareCity(city);
    });
    return city;
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

async function fetchWeatherData(cityName, state, country) {
    try {
        const city = await findCity(cityName, state, country);
        const apiMiddle = `lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely,hourly&units=imperial`;
        const response = await fetch(`${apiCallStart}${apiMiddle}${apiCallEnd}`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(processWeatherData(weatherData));
    }
    catch(error) {
        console.log(error);
    }
}

submitButton.addEventListener('click', () => {
    // todo: validation!
    fetchWeatherData(
        cityInputBox.value,
        stateInputBox.value,
        countryInputBox.value);
    });
