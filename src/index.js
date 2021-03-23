import {fetchWeatherData} from './weather-api';

const submitButton = document.querySelector('#submit-button');
const cityInputBox = document.querySelector('#city-name');

submitButton.addEventListener('click', () => {
    // todo: validation!
    fetchWeatherData(cityInputBox.value)});