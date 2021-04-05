import React from 'react';

function Field(props) {
    return (
        <div className='city-entry'>
            {props.text}
        </div>
    );
}

function CityEntry(props) {
    const {name, state, country, onClick} = props;
    let stateField;
    let countryField;
    if (state) {
        stateField = <Field text={state} />;
    }
    if (country) {
        countryField = <Field text={country} />;
    }

    return (
        <div className='city-data-display' onClick={onClick}>
            <Field text={name}/>
            {stateField}
            {countryField}
            //TODO: need to pass along onClick method here!
        </div>
    );
}

export default CityEntry;