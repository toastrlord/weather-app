'use strict'

// want to have:
// day of the week high temp, low temp, weather icon, chance of rain

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
    //weatherIcon.src = getWeatherIcon(dayData.weatherDescription);
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

export {createDailyWeatherElement};