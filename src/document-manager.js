'use strict'

import {add as addDate, format as formatDate} from 'date-fns';
import {getTemperatureText, convertTemperature} from './temp-conversion';

const imgURLStart = 'http://openweathermap.org/img/wn/';
const imgURLEnd = '@2x.png';
const todayDate = new Date();
const today = (new Date()).getDay();

/* weather icon mapping is per openweathermap.org/weather-conditions
   the 'd' at the end stands for day,
   there are also nightly icons with 'n' */
const weatherIcons = {
    clear: '01d',
    clouds: '02d',
    'scattered clouds': '03d',
    'broken clouds': '04d',
    'shower rain': '09d',
    rain: '10d',
    thunderstorm: '11d',
    snow: '13d',
    mist: '50d',
}

/**
 * Return the proper URL for this weather status
 * @param {String} weatherDescription 
 * @returns {String}
 */
function getWeatherIcon(weatherDescription) {
    if (weatherIcons.hasOwnProperty(weatherDescription)) {
        return `${imgURLStart}${weatherIcons[weatherDescription]}${imgURLEnd}`;
    }
    else {
        console.log(`No icon found for ${weatherDescription}`);
    }
}

/**
 * Return 'Today' if index is 0, otherwise add the value to todays date and return the proper weekday string
 * @param {Number} index The number of days past today
 * @returns {String}
 */
function getWeekday(index) {
    if (index === 0) {
        return 'Today';
    }
    else {
        const day = (today + index) % 7;
        switch(day) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
    }
}

/**
 * Return a string formatted as 'Month Xth'
 * @param {Number} index The number of days past today
 * @returns {String} 
 */
function getDate(index) {
    return formatDate(
        addDate(todayDate, { days: index }),
        'MMMM do');
}

function createDateElement(index) {
    const date = document.createElement('div');
    date.classList.add('weekday');
    date.textContent = getDate(index);
    
    return date;
}

function createDayOfWeekElement(index) {
    const dayOfWeek = document.createElement('div');
    dayOfWeek.classList.add('weekday');
    dayOfWeek.textContent = getWeekday(index);

    return dayOfWeek;
}

function createTemperatureElement(label, temp, units) {
    const element = document.createElement('div');
    element.textContent = getTemperatureText(label, temp, units);
    element.classList.add('temperature');
    element.dataset.unroundedTemp = convertTemperature(temp, units);
    
    return element;
}

function createWeatherIconElement(dayData) {
    const weatherIcon = document.createElement('img');
    weatherIcon.src = getWeatherIcon(dayData.weatherDescription.toLowerCase());
    
    return weatherIcon;
}

function createWeatherTextElement(dayData) {
    const weatherTextElement = document.createElement('div');
    weatherTextElement.textContent = dayData.weatherDescription;
    weatherTextElement.classList.add('weather-condition');

    return weatherTextElement;
}

/**
 * Generate an HTML element given one days worth of weather data
 * @param {*} dayData 
 * @param {Number} index
 */
function createDailyWeatherElement(dayData, index) {
    const container = document.createElement('div');
    container.classList.add('weather-data-display');
    container.appendChild(createDateElement(index));
    container.appendChild(createDayOfWeekElement(index));
    container.appendChild(createWeatherIconElement(dayData));
    container.appendChild(createWeatherTextElement(dayData));
    const temperatureContainer = document.createElement('div'); // contains the high and low temperatures
    temperatureContainer.classList.add('temperature-container');

    temperatureContainer.appendChild(createTemperatureElement('Hi:', dayData.maxTemp, dayData.units));
    temperatureContainer.appendChild(createTemperatureElement('Lo:', dayData.minTemp, dayData.units));
    container.appendChild(temperatureContainer);

    return container;
}

function createCityEntry(text) {
    const element = document.createElement('div');
    element.textContent = text;
    element.classList.add('city-entry');
    
    return element;
}

function createCityElement(cityData) {
    const container = document.createElement('div');
    container.classList.add('city-data-display');
    container.appendChild(createCityEntry(cityData.name));
    if (cityData.hasOwnProperty('state')) {
        container.appendChild(createCityEntry(cityData.state));
    }
    if (cityData.hasOwnProperty('country')) {
        container.appendChild(createCityEntry(cityData.country));
    }

    return container;
}

function createCityHeaderElement(numCities) {
    const container = document.createElement('div');
    container.classList.add('city-message');
    container.textContent = `${numCities} cities found! Select one:`;
    display.appendChild(container);

    return container;
}

function createLoadingCircle(delay) {
    const circle = document.createElement('div');
    circle.classList.add('loading-icon');
    circle.style.animationDelay = `${delay}s`;

    return circle;
}

function createLoadingElement() {
    const container = document.createElement('div');
    container.classList.add('flex-container');
    container.appendChild(createLoadingCircle(-.5));
    container.appendChild(createLoadingCircle(-.25))
    container.appendChild(createLoadingCircle(0))

    return container;
}

export {createDailyWeatherElement, createCityElement, createLoadingElement, createCityHeaderElement};