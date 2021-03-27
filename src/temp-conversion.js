import { te } from "date-fns/locale";

const IMPERIAL = 'F';
const METRIC = 'C';
let currentUnits = IMPERIAL;

function swapToImperial() {
    currentUnits = IMPERIAL;
}

function swapToMetric() {
    currentUnits = METRIC;
}

/**
 * 
 * @param {Number} temperature Temperature in degrees F
 * @returns {Number} Equivalent temperature in celsius
 */
function fahrenheitToCelsius(temperature) {
    return (temperature - 32) * 5 / 9;
}

/**
 * 
 * @param {Number} temperature Temperature in degrees C
 * @returns {Number} Equivalent temperature in fahrenheit
 */
function celsiusToFahrenheit(temperature) {
    return temperature * 9 / 5 + 32;
}

/**
 * Convert a temperature to the current units
 * @param {Number} temp A temperature in the opposite units of the current units (e.x. if units is imperial, then temp is metric and vice versa) 
 * @param {String} units Whether the given temp is imperial or metric
 */
function convertTemperature(temp, units) {
    if (currentUnits === units) {
        return temp;
    }
    if (currentUnits === METRIC) {
        return fahrenheitToCelsius(temp);
    }
    if (currentUnits === IMPERIAL) {
        return celsiusToFahrenheit(temp);
    }
    throw new Error(`Invalid units system! (${units})`);
}

/**
 * Get the text to be displayed with the weather forecast
 * @param {String} label 
 * @param {Number} temperature The temperature to be converted
 * @param {String} units Whether the given temp is imperial or metric
 */
function getTemperatureText(label, temperature, units) {
    const convertedTemp = convertTemperature(temperature, units);
    return `${label} ${Math.round(convertedTemp)}°${currentUnits}`;
}

function updateTemp(weatherElement) {
    const temperatures = weatherElement.querySelectorAll('.temperature');
    temperatures.forEach(temp => {
        const label = temp.textContent.split(' ')[0];
        const units = temp.textContent.split('°')[1];
        const unroundedTemp = parseFloat(temp.dataset.unroundedTemp);
        temp.textContent = getTemperatureText(label, unroundedTemp, units);
        temp.dataset.unroundedTemp = convertTemperature(unroundedTemp, units);
    });
}

export {getTemperatureText, swapToImperial, swapToMetric, updateTemp, convertTemperature}