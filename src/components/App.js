import React, {Component} from 'react';
import Searchbar from './Searchbar';
import CitiesDisplay from './CitiesDisplay';
import WeeklyForecast from './WeeklyForecast';

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
        this.toggleUnits = this.toggleUnits.bind(this);
    }

    searchForCity(name) {
        console.log('Search for ' + name);
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
            displayElement =  <WeeklyForecast city={this.state.currentCity} displayUnits={displayUnits} />;
        }

        return <div>
            <Searchbar onClickGo={this.searchForCity} toggleUnits={this.toggleUnits}/>
            <div id='display'>
                {displayElement}
            </div>
        </div>;
    }
}

export default App;