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

async function search(cityName) {
    clearDisplay();
    const cities = await findCities(cityName);
    if (cities.length === 0) {
        console.log('No cities found!');
    }
    else if (cities.length === 1) {
        const weather = await fetchWeatherData(cities[0]);
        weather.forEach(dayData => {
            const element = createDailyWeatherElement(dayData);
            display.appendChild(element);
        });
    }
    else {
        cities.forEach(city => { 
            const element = createCityElement(city);
            display.appendChild(element);
            element.addEventListener('click', () => {
                clearDisplay();
                fetchWeatherData(city)
                .then(response => {
                    response.forEach(weather => {
                        const element = createDailyWeatherElement(weather);
                        display.appendChild(element);
                    });
                })
            });
        });

    }
}

submitButton.addEventListener('click', () => {
    if (cityInputBox.checkValidity()) {
        search(cityInputBox.value);
    }
});