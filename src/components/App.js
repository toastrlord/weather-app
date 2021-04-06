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
            displayUnits: 'F',
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

    toggleUnits() {
        this.setState({
            displayUnits: this.state.displayUnits === 'F' ? 'C' : 'F'
        });
    }

    render() {
        const { display, name, displayUnits } = this.state;
        let displayElement = null;
        if (display === CITIES) {
            displayElement =  <CitiesDisplay searchName={name} onClick={clickOnCity} />;
        }
        if (display === FORECAST) {
            displayElemnt =  <WeeklyForecast city={this.state.currentCity} displayUnits={displayUnits} />;
        }
        return null;
    }
}