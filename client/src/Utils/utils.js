export function parseValue(val) {
    const value = val.toString()
    const splitted = value.split('.');
    if (splitted.length === 1) {
        return '$' + value + '.00'
    }
    const [dollars, cents] = splitted;

    if (cents.length === 1) {
        return '$' + dollars + '.' + cents + '0'
    }
    if (cents.length === 2) {
        return '$' + dollars + '.' + cents
    }
    if (cents.length > 2) {
        return '$' + dollars + '.' + cents.slice(0,2)
    }
}

export function parseDay(date) {
    const dayMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }


    const dayObj = new Date(date)
    const dayOfWeek = dayObj.getDay()
    return dayMap[dayOfWeek]
}

export function parse15Days(date) {
    const dayObj = new Date(date)
    const month = (dayObj.getMonth()+1).toString()
    const day = (dayObj.getDate()).toString()
    return month + '/' + day
}

export function parseYear(date) {
    const monthMap = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }
    const dayObj = new Date(date);
    const month = dayObj.getMonth()
    return monthMap[month]
}