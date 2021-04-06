import React, { Component } from 'react';
import CityEntry from './CityEntry';
import {findCities} from './../weather-api';
import LoadingIcon from './LoadingIcon';

class CitiesDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            loaded: false,
        }
    }

    async componentDidMount() {
        const cities = await findCities(this.props.searchName);
        this.setState({
            cities: cities,
            loaded: true,
        });
    }

    render() {
        const {cities, loaded} = this.state;
        if (loaded) {
            return (
                <div className='city-container'>
                    {cities.map(city => {
                        return (<CityEntry 
                            cityData={city}
                            onClick={() => props.onClick(city)}
                        />);
                    })}
                </div>
               ); 
        }
        else {
            return (<LoadingIcon />);
        }
    }
}

export default CitiesDisplay;