import {fetchWeatherData, findCities} from './weather-api';

const submitButton = document.querySelector('#submit-button');
const cityInputBox = document.querySelector('#city-name');

submitButton.addEventListener('click', () => {
    if (cityInputBox.checkValidity()) {
        console.log('checking for cities');
        const cities = findCities(cityInputBox.value);
        if (cities.length === 1) {
            console.log(fetchWeatherData(cities[0]));
        }
        else {
            // have to display the cities
            console.log(cities);
        }
    }
});