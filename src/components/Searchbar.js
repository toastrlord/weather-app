import React from 'react';

function Searchbar(props) {
    const input = React.createRef();
    return (
        <div className='searchbar-form'>
            <label htmlFor='city-name'>City:</label>
            <input type='text' id='city-name' autoComplete='off' required ref={input}/>
            <button id='submit-button' type='button' onClick={() => props.onClickGo(input.current.value)}>Go!</button>
            <div id='fahrenheit'>°F</div>
            <div>
                <label className='switch'>
                    <input id='temp-swap' type='checkbox' onClick={props.toggleUnits}/>
                    <span className='slider round' />
                </label>
            </div>
            <div id='celsius'>°C</div>
        </div>);
}

export default Searchbar;