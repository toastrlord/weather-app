import {fetchWeatherData, findCities} from './weather-api';
import {createDailyWeatherElement, createCityElement} from './document-manager';

const submitButton = document.querySelector('#submit-button');
const cityInputBox = document.querySelector('#city-name');
const display = document.querySelector('#display');
const form = document.querySelector('form');

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
        const container = document.createElement('div');
        container.classList.add('flex-container');
        // TODO: hide loading icon now that we're done!
        weather.forEach((dayData, index) => {
            const element = createDailyWeatherElement(dayData, index);
            container.appendChild(element);
        });
        display.appendChild(container);
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
        const cityText = document.createElement('div');
        cityText.classList.add('city-message');
        cityText.textContent = `${cities.length} cities found! Select one:`;
        display.appendChild(cityText);
        const cityDisplay = document.createElement('div');
        cityDisplay.classList.add('flex-container');
        display.appendChild(cityDisplay);
        cities.forEach(city => { 
            const element = createCityElement(city);
            cityDisplay.appendChild(element);
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

form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitButton.click();
    }
})