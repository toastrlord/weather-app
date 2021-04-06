import LoadingIcon from './LoadingIcon';
import {fetchWeatherData} from './..weather-api';

class WeeklyForecast extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            weatherData: null,
            loaded: false,
            units: props.units,
        }
    }

    async componentDidMount() {
        const data = await fetchWeatherData(this.props.city);
        this.setState({
            weatherData: data,
            loaded: true,
        });
    }

    render() {
        const {weatherData, loaded} = this.state;
        if (loaded) {
            return <div className='weather-container'>
                {weatherData.map((dailyData, index) => {
                    return <DailyForecast dayData={dailyData} index={index} displayUnits={props.displayUnits}/>
                })};
            </div>
        }
        else {
            return <LoadingIcon />;
        }
    }
}

export default WeeklyForecast;