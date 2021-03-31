const { faPray } = require("@fortawesome/free-solid-svg-icons");

function parseValue(val) {
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

function parseDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function parseDay(date) {
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

function parse15Days(date) {
    const dayObj = new Date(date)
    const month = (dayObj.getMonth()+1).toString()
    const day = (dayObj.getDate()).toString()
    return month + '/' + day
}

function parseYear(date) {
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

// function parseResponse(data) {
//     const timeLine = {}
//     for (var i = 0; i < data.length; i++) {
//         var stock = data[i];
//         var info = stock.info;
//         var symbolInfo = {}
//         //Iterating through oneWeek:
//         const weekInfo = info[0];
//         const interList = weekInfo.oneWeek;
//         var weekDateAxis = []
//         var weekValueAxis = []
//         for (var j = 0; j < interList.length; j++) {
//             var dateValuePairs = interList[j]
//             var date = dateValuePairs[Object.keys(dateValuePairs)[0]];
//             var value = dateValuePairs[Object.keys(dateValuePairs)[1]];
//             weekDateAxis.push(parseDay(date))
//             // weekValueAxis.push(parseValue(value))
//             weekValueAxis.push(value)
//         }
//         symbolInfo['oneWeek'] = [weekDateAxis, weekValueAxis];
//         //Iterating through oneMonth:
//         const monthInfo = info[1];
//         const monthInter = monthInfo.monthly;
//         var monthDateAxis = []
//         var monthValueAxis = []
//         for (var j = 0; j < monthInter.length; j++) {
//             var dateValuePairs = monthInter[j]
//             var date = dateValuePairs[Object.keys(dateValuePairs)[0]];
//             var value = dateValuePairs[Object.keys(dateValuePairs)[1]];
//             monthDateAxis.push(parse15Days(date))
//             monthValueAxis.push(value)
//         }
//         symbolInfo['oneMonth'] = [monthDateAxis, monthValueAxis];
//         //Iterating through oneYear:
//         const yearInfo = info[2];
//         const yearInter = yearInfo.oneYear;
//         var yearDateAxis = []
//         var yearValueAxis = []
//         for (var j = 0; j < yearInter.length; j++) {
//             var dateValuePairs = yearInter[j]
//             var date = dateValuePairs[Object.keys(dateValuePairs)[0]];
//             var value = dateValuePairs[Object.keys(dateValuePairs)[1]];
//             yearDateAxis.push(parseYear(date))
//             yearValueAxis.push(value)
//         }
//         symbolInfo['oneYear'] = [yearDateAxis, yearValueAxis];
//         timeLine[stock.name] = symbolInfo
//     }
//     return timeLine
// }

// function parseOneSymbol(data) {
//     var symbolInfo = {}
//     //Iterating through oneWeek:
//     const weekInfo = data[0];
//     const interList = weekInfo.oneWeek;
//     var weekDateAxis = []
//     var weekValueAxis = []
//     for (var j = 0; j < interList.length; j++) {
//         var dateValuePairs = interList[j]
//         var date = dateValuePairs[Object.keys(dateValuePairs)[0]];
//         var value = dateValuePairs[Object.keys(dateValuePairs)[1]];
//         weekDateAxis.push(parseDay(date))
//         // weekValueAxis.push(parseValue(value))
//         weekValueAxis.push(value)
//     }
//     symbolInfo['oneWeek'] = [weekDateAxis, weekValueAxis];
//     //Iterating through oneMonth:
//     const monthInfo = data[1];
//     const monthInter = monthInfo.monthly;
//     var monthDateAxis = []
//     var monthValueAxis = []
//     for (var j = 0; j < monthInter.length; j++) {
//         var dateValuePairs = monthInter[j]
//         var date = dateValuePairs[Object.keys(dateValuePairs)[0]];
//         var value = dateValuePairs[Object.keys(dateValuePairs)[1]];
//         monthDateAxis.push(parse15Days(date))
//         monthValueAxis.push(value)
//     }
//     symbolInfo['oneMonth'] = [monthDateAxis, monthValueAxis];
//     //Iterating through oneYear:
//     const yearInfo = data[2];
//     const yearInter = yearInfo.oneYear;
//     var yearDateAxis = []
//     var yearValueAxis = []
//     for (var j = 0; j < yearInter.length; j++) {
//         var dateValuePairs = yearInter[j]
//         var date = dateValuePairs[Object.keys(dateValuePairs)[0]];
//         var value = dateValuePairs[Object.keys(dateValuePairs)[1]];
//         yearDateAxis.push(parseYear(date))
//         yearValueAxis.push(value)
//     }
//     symbolInfo['oneYear'] = [yearDateAxis, yearValueAxis];
//     return symbolInfo

// }

function parseAPIdata(data, parser) {
    const dates = []
    const values = []
    for (var i = 0; i < data.length; i++) {
        var dateValuePairs = data[i]
        var date = dateValuePairs[Object.keys(dateValuePairs)[0]];
        var value = dateValuePairs[Object.keys(dateValuePairs)[1]];
        dates.push(parser(date))
        values.push(value)
    }
    return [dates, values]
}



exports.parseValue = parseValue
exports.parseDate = parseDate
exports.parseDay = parseDay
exports.parse15Days = parse15Days
exports.parseYear = parseYear
// exports.parseResponse = parseResponse
// exports.parseOneSymbol = parseOneSymbol
exports.parseAPIdate = parseAPIdata