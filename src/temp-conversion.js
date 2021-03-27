const IMPERIAL = 'F';
const METRIC = 'C';
let currentUnits = IMPERIAL;

/**
 * Swap the current units system
 */
function toggleUnits() {
    if (currentUnits === IMPERIAL) {
        currentUnits = METRIC;
    }
    else {
        currentUnits = IMPERIAL;
    }
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

/**
 * Update the temperatures to be in the current units system. Store the unrounded temp in a data attribute so we don't lose precision on subsequent
 * changes of units
 * @param {HTMLElement} weatherElement A single weather forecast element
 */
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

export {getTemperatureText, toggleUnits, updateTemp, convertTemperature}