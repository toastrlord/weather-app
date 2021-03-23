import {fetchWeatherData, findCities} from './weather-api';
import {createDailyWeatherElement, createCityElement} from './document-manager';

const submitButton = document.querySelector('#submit-button');
const cityInputBox = document.querySelector('#city-name');
const display = document.querySelector('#display');

function clearDisplay() {
    while (display.firstChild) {
        display.firstChild.remove();
    }
}

async function displayWeatherResults(cityData) {
    clearDisplay();
    try {
        // TODO: show loading icon!
        const weather = await fetchWeatherData(cityData);
        // TODO: hide loading icon now that we're done!
        weather.forEach(dayData => {
            const element = createDailyWeatherElement(dayData);
            display.appendChild(element);
        });
    }
    catch(error) {
        console.log(error);
    }
}

function displayError(errorText) {
    const element = document.createElement('div');
    element.classList.add('error-message');
    element.textContent = errorText;
    display.appendChild(element);
}

async function search(cityName) {
    clearDisplay();
    const cities = await findCities(cityName);
    if (cities.length === 0) {
        displayError('No cities found!');
    }
    else if (cities.length === 1) {
        displayWeatherResults(cities[0]);
    }
    else {
        cities.forEach(city => { 
            const element = createCityElement(city);
            display.appendChild(element);
            element.addEventListener('click', () => {
                displayWeatherResults(city);
            });
        });
    }
}

submitButton.addEventListener('click', () => {
    if (cityInputBox.checkValidity()) {
        search(cityInputBox.value);
    }
});