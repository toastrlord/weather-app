import {fetchWeatherData, findCities} from './weather-api';
import {createDailyWeatherElement} from './document-manager';

const submitButton = document.querySelector('#submit-button');
const cityInputBox = document.querySelector('#city-name');

async function weeklyWeatherTest() {
    const cities = await findCities('Rochester');
    const weather = await fetchWeatherData(cities[0]);
    weather.forEach(dayData => {
        const element = createDailyWeatherElement(dayData);
        document.querySelector('body').appendChild(element);
    });
}

weeklyWeatherTest();

submitButton.addEventListener('click', () => {
    if (cityInputBox.checkValidity()) {
        console.log('checking for cities');
        const cities = findCities(cityInputBox.value).then(response => {
            console.log(response);
            if (response.length === 1) {
                return response[0];
            }
            else {
                return response;
            }
        });
    }
});