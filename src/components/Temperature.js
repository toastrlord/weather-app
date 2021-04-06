const IMPERIAL = 'F';
const METRIC = 'C';

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
function convertTemperature(tempUnits, displayUnits, temp) {
    if (tempUnits === displayUnits) {
        return temp;
    }
    if (displayUnits === METRIC) {
        return fahrenheitToCelsius(temp);
    }
    if (displayUnits === IMPERIAL) {
        return celsiusToFahrenheit(temp);
    }
    throw new Error(`Invalid units system! (${units})`);
}


function Temperature(props) {
    const convertedTemp = convertTemperature(tempUnits, displayUnits, props.temperature);
    return (
        <div className='temperature'>
            {`${props.label} ${Math.round(convertedTemp)}° ${displayUnits}`}
        </div>
    );
}

export default Temperature;