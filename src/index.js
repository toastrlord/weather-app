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
        // TODO: hide loading icon now that we're done!
        let promises = [];
        weather.forEach((dayData, index) => {
            const element = createDailyWeatherElement(dayData, index);
            container.appendChild(element);
            const img = element.querySelector('img');
            promises.push(new Promise((resolve, reject) => {
                try {
                    img.onload = resolve();
                }
                catch(error) {
                    console.log(error);
                    reject();
                }
            }));
        });
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