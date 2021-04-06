import DailyForecastDateHeader from './DailyForecastDateHeader';
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';

function DailyForecast(props) {
    const dayData = props.dayData;
    return (<div className='weather-data-display'>
        <DailyForecastDateHeader index={props.index} />
        <WeatherIcon description={dayData.weatherDescription}/>
        <Temperature label='Hi:' temperature={dayData.maxTemp} dataUnits={dayData.units} displayUnits={props.displayUnits} />
        <Temperature label='Lo:' temperature={dayData.minTemp} dataUnits={dayData.units} displayUnits={props.displayUnits} />
    </div>);
}

export default DailyForecast;