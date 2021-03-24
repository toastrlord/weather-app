'use strict'

const imgURLStart = 'http://openweathermap.org/img/wn/';
const imgURLEnd = '@2x.png';

// weather icon mapping is per openweathermap.org/weather-conditions
// currently only has daytime icons
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

function getWeatherIcon(weatherDescription) {
    if (weatherIcons.hasOwnProperty(weatherDescription)) {
        return `${imgURLStart}${weatherIcons[weatherDescription]}${imgURLEnd}`;
    }
    else {
        console.log(`No icon found for ${weatherDescription}`);
    }
}

function getWeekday(index) {
    const today = (new Date()).getDay();
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
 * Generate an HTML element given one days worth of weather data
 * @param {*} dayData 
 */
function createDailyWeatherElement(dayData, index) {
    const container = document.createElement('div');
    container.classList.add('weather-data-display');
    const dayOfWeek = document.createElement('div');
    dayOfWeek.classList.add('weekday');
    dayOfWeek.textContent = getWeekday(index); // FIXME!
    container.appendChild(dayOfWeek);
    const weatherIcon = document.createElement('img');
    weatherIcon.src = getWeatherIcon(dayData.weatherDescription.toLowerCase());
    container.appendChild(weatherIcon);
    const weatherTextElement = document.createElement('div');
    weatherTextElement.textContent = dayData.weatherDescription;
    container.appendChild(weatherTextElement);
    const temperatureContainer = document.createElement('div'); // contains the high and low temperatures
    temperatureContainer.classList.add('temperature-container');

    // TODO: add units!!
    const highTemp = document.createElement('div');
    highTemp.textContent = `Hi: ${dayData.maxTemp}°`;
    highTemp.classList.add('temperature');
    temperatureContainer.appendChild(highTemp);
    const lowTemp = document.createElement('div');
    lowTemp.textContent = `Lo: ${dayData.minTemp}°`;
    lowTemp.classList.add('temperature');
    temperatureContainer.appendChild(lowTemp);
    container.appendChild(temperatureContainer);

    return container;
}

function createCityElement(cityData) {
    const container = document.createElement('div');
    container.classList.add('city-data-display');
    const cityName = document.createElement('div');
    cityName.textContent = cityData.name;
    container.appendChild(cityName);
    if (cityData.hasOwnProperty('state')) {
        const stateElement = document.createElement('div');
        stateElement.textContent = cityData.state;
        container.appendChild(stateElement);
    }
    if (cityData.hasOwnProperty('country')) {
        const countryElement = document.createElement('div');
        countryElement.textContent = cityData.country;
        container.appendChild(countryElement);
    }

    return container;
}

export {createDailyWeatherElement, createCityElement};