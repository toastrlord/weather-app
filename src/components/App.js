import React, {Component} from 'react';
import CitiesDisplay from './CitiesDisplay';

const NONE = 0;
const FORECAST = 1;
const CITIES = 2;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: NONE,
            currentCity: '',
        }

        this.searchForCity = this.searchForCity.bind(this);
        this.clickOnCity = this.clickOnCity.bind(this);
    }

    searchForCity(name) {
        this.setState({
            display: CITIES,
            name: name,
        });
    }

    clickOnCity(city) {
        this.setState({
            display: FORECAST,
            currentCity: city,
        });
    }

    render() {
        const { display, name } = this.state;
        if (display === CITIES) {
            return <CitiesDisplay searchName={name} onClick={clickOnCity} />
        }
        if (display === FORECAST) {
            return <WeeklyForecast city={this.state.currentCity} />
        }
        return null;
    }
}