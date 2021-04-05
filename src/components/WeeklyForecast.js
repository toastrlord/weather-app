import LoadingIcon from './LoadingIcon';
import {fetchWeatherData} from './..weather-api';

class WeeklyForecast extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            weatherData: null,
            loaded: false,
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
        if (loaded) {
            return {this.state.weatherData.map(dailyData => {
                return null;
            })};
        }
        else {
            return <LoadingIcon />;
        }
    }
}