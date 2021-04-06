function Searchbar(props) {
    return (
        <form onSubmit='return false' className='searchbar-form'>
            <label for='city-name'>City:</label>
            <input type='text' id='city-name' autoComplete='off' required />
            <button id='submit-button' type='button'>Go!</button>
            <div id='fahrenheit'>°F</div>
            <div>
                <label className='switch'>
                    <input id='temp-swap' type='checkbox' onClick={props.toggleUnits}/>
                    <span className='slider round' />
                </label>
            </div>
            <div id='celsius'>°C</div>
        </form>);
}

export default Searchbar;