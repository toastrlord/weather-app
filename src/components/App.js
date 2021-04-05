import React, {Component} from 'react';
import CitiesDisplay from './CitiesDisplay';

const NONE = 0;
const FORECAST = 1;
const CITY = 2;

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
            display: CITY,
            currentCity: name,
        });
    }

    clickOnCity(city) {
        this.setState({
            display: FORECAST,
        });
    }

    render() {
        const { display, name } = this.state;
        if (display === CITY) {
            <CitiesDisplay searchName={name} onClick={clickOnCity} />
        }
        if (display === WEATHER) {

        }
    }
}