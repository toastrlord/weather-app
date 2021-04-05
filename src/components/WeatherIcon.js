const imgURLStart = 'http://openweathermap.org/img/wn/';
const imgURLEnd = '@2x.png';

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

function WeatherIcon(props) {
    const description = props.weatherDescription;
    return (
        <div>
            <img src={getWeatherIcon(description.toLowerCase())} />
            <div className='weather-condition'>{description}</div>
        </div>
    );
}

export default WeatherIcon;