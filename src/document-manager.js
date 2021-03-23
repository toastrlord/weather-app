'use strict'

function getWeatherIcon(weatherDescription) {
    return '';
}

/**
 * Generate an HTML element given one days worth of weather data
 * @param {*} dayData 
 */
function createDailyWeatherElement(dayData) {
    const container = document.createElement('div');
    container.classList.add('weather-data-display');
    const dayOfWeek = document.createElement('div');
    dayOfWeek.classList.add('weekday');
    dayOfWeek.textContent = 'Day'; // FIXME!
    container.appendChild(dayOfWeek);
    const weatherIcon = document.createElement('img');
    weatherIcon.src = getWeatherIcon(dayData.weatherDescription);
    container.appendChild(weatherIcon);
    const temperatureContainer = document.createElement('div'); // contains the high and low temperatures
    temperatureContainer.classList.add('temperature-container');
    const highTemp = document.createElement('div');
    highTemp.textContent = dayData.maxTemp;
    highTemp.classList.add('temperature');
    temperatureContainer.appendChild(highTemp);
    const lowTemp = document.createElement('div');
    lowTemp.textContent = dayData.minTemp;
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