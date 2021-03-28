import {fetchWeatherData, findCities} from './weather-api';
import {createDailyWeatherElement, createCityElement, createLoadingElement} from './document-manager';
import {toggleUnits, updateTemp} from './temp-conversion';

const submitButton = document.querySelector('#submit-button');
const cityInputBox = document.querySelector('#city-name');
const fahrenheitButton = document.querySelector('#fahrenheit');
const celsiusButton = document.querySelector('#celsius');
const display = document.querySelector('#display');
const tempSwapSwitch = document.querySelector('#temp-swap');
const form = document.querySelector('form');

function clearDisplay() {
    while (display.firstChild) {
        display.firstChild.remove();
    }
}

async function displayWeatherResults(cityData) {
    clearDisplay();
    // show that we're loading...
    display.appendChild(createLoadingElement());
    try {
        const cityHeader = document.createElement('div');
        if (cityData.state !== undefined) {
            cityHeader.textContent = `Weekly forecast for ${cityData.name}, ${cityData.state}, ${cityData.country}`;
        }
        else {
            cityHeader.textContent = `Weekly forecast for ${cityData.name}, ${cityData.country}`;
        }
        cityHeader.classList.add('city-header');
        const weather = await fetchWeatherData(cityData);
        const container = document.createElement('div');
        container.classList.add('flex-container');
        let promises = [];
        weather.forEach((dayData, index) => {
            const element = createDailyWeatherElement(dayData, index);
            container.appendChild(element);
            promises.push(new Promise((resolve, reject) => {
                try {
                    element.onload = resolve();
                }
                catch(error) {
                    console.log(error);
                    reject();
                }
            }));
        });
        // wait until the images have loaded and we're all set
        await Promise.all(promises);
        clearDisplay();
        display.appendChild(cityHeader);
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

function displayCities(cities) {
    display.appendChild(createCityHeaderElement(cities.length));
    cities.forEach(city => { 
        const element = createCityElement(city);
        cityDisplay.appendChild(element);
        element.addEventListener('click', () => {
            displayWeatherResults(city);
        });
    });
}

async function search(cityName) {
    clearDisplay();
    display.appendChild(createLoadingElement());
    const cities = await findCities(cityName);
    clearDisplay();
    if (cities.length === 0) {
        displayError('No cities found!');
    }
    else if (cities.length === 1) {
        displayWeatherResults(cities[0]);
    }
    else {
        displayCities(cities);
    }
}

submitButton.addEventListener('click', () => {
    if (cityInputBox.checkValidity()) {
        search(cityInputBox.value);
    }
});

tempSwapSwitch.addEventListener('change', () => {
    toggleUnits();
    const forecastData = display.querySelectorAll('.weather-data-display');
    if (forecastData) {
        forecastData.forEach(forecast => {
            updateTemp(forecast);
        });
    }
});

form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitButton.click();
    }
});