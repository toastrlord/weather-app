const todayDate = new Date();
const today = (new Date()).getDay();

/**
 * Return 'Today' if index is 0, otherwise add the value to todays date and return the proper weekday string
 * @param {Number} index The number of days past today
 * @returns {String}
 */
 function getWeekday(index) {
    if (index === 0) {
        return 'Today';
    }
    else {
        const day = (today + index) % 7;
        switch(day) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
    }
}

/**
 * Return a string formatted as 'Month Xth'
 * @param {Number} index The number of days past today
 * @returns {String} 
 */
function getDate(index) {
    return formatDate(
        addDate(todayDate, { days: index }),
        'MMMM do');
}

function DailyForecastDateHeader(props) {
    const index = props.index;
    const date = getDate(index);
    const weekday = getWeekday(index);
    return <div>
        <div className='weekday'>{date}</div>
        <div className='weekday'>{weekday}</div>
    </div>
}

export default DailyForecastDateHeader;