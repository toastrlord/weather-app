import React from 'react';
import CityEntry from './CityEntry';

class CitiesDisplay extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        
    }

    render() {
        return (
            <div className='city-container'>
                {props.cities.map(city => {
                    <CityEntry 
                        name={city.name} 
                        state={city.state} 
                        country={city.country}
                        onClick={() => props.onClick(city)}
                    />
                })}
            </div>
           ); 
    }
}

export default CitiesDisplay;