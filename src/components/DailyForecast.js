import DailyForecastDateHeader from "./DailyForecastDateHeader";

function createTemperatureElement(label, temp, units) {
    const element = document.createElement('div');
    element.textContent = getTemperatureText(label, temp, units);
    element.classList.add('temperature');
    element.dataset.unroundedTemp = convertTemperature(temp, units);
    
    return element;
}

/**
 * Generate an HTML element given one days worth of weather data
 * @param {*} dayData 
 * @param {Number} index
 */
function createDailyWeatherElement(dayData, index) {
    const container = document.createElement('div');
    container.classList.add('weather-data-display');
    const headerContainer = document.createElement('div');
    headerContainer.appendChild(createDateElement(index));
    headerContainer.appendChild(createDayOfWeekElement(index));
    container.append(headerContainer);
    container.appendChild(createWeatherIconElement(dayData));
    container.appendChild(createWeatherTextElement(dayData));
    const temperatureContainer = document.createElement('div'); // contains the high and low temperatures
    temperatureContainer.classList.add('temperature-container');

    temperatureContainer.appendChild(createTemperatureElement('Hi:', dayData.maxTemp, dayData.units));
    temperatureContainer.appendChild(createTemperatureElement('Lo:', dayData.minTemp, dayData.units));
    container.appendChild(temperatureContainer);

    return container;
}

function DailyForecast(props) {
    const dayData = props.dayData;
    return (<div className='weather-data-display'>
        <DailyForecastDateHeader index={props.index} />
        <WeatherIcon description={dayData.weatherDescription}/>
        <Temperatures hi={dayData.maxTemp} lo={dayData.minTemp} initialUnits={dayData.units}/>
    </div>);
}

export default DailyForecast;