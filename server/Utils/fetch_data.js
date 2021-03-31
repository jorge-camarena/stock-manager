const fetch = require('node-fetch')
const utils =  require('./utils');
require('dotenv').config()
const api_token = process.env.TIINGO_TOKEN;


async function fetchOneDay(symbol) {
    /* 
    This function fetches the open, low, and high price of a symbol from TIINGO API.
    Example Call:
    >>>fetchOneDay(AAPL)
    {
        ajdOpen: 120.00,
        ajdLow: 119.12,
        adjHigh: 125.43,
        date: Date.now()
    }
     */
    const response = await fetch(`https://api.tiingo.com/tiingo/daily/${symbol}/prices?token=${api_token}`)
    const json = await response.json();
    const filtered = {
        adjOpen: await json[0].adjOpen,
        adjLow: await json[0].adjLow,
        adjHigh: await json[0].adjHigh,
        date: await json[0].date
    }
    const hourlyObj = {dayStats : filtered}
    return hourlyObj
}

async function fetchOneWeek(symbol) {
    /* This function fetches the adjusted closing prices for the given symbol for the last 5-7 days
    Example Call:
    >>>fetchOneWeek(AAPL)
    [
        [Monday, Tuesday, Wednesday, Thursday, Friday],
        [123.09, 132.42, 130.32, 131.43, 133.43]
    ]
     */
    const now = new Date(Date.now())
    const weekAgo = new Date(Date.now() - (7 * 1000 * 86400))
    const end = utils.parseDate(now);
    const start = utils.parseDate(weekAgo)
    const url = `https://api.tiingo.com/tiingo/daily/${symbol}/prices?startDate=${start}&endDate=${end}&token=${api_token}`
    const response = await fetch(url)
    const json = await response.json();
    var filtered = []
    for (var i = 0; i < json.length; i++) {
        var item = json[i];
        var newObj = {
            date: item.date,
            adjClose: item.adjClose
        }
        filtered.push(newObj)
    }
    console.log(filtered)

    const dailyObj = utils.parseAPIdate(filtered, utils.parseDay)
    return dailyObj
}

async function fetch15Days(symbol) {
    /* This function fetches the adjusted closing prices for the given symbol for the last 15 days
    Example Call:
    >>>fetch15Days(AAPL)
    [
        [3/1, 3/2, 3/3, 3/4, 3/5, 3/6, 3/7, 3/8, 3/9, 3/10, 3/11, 3/12, 3/13, 3/14, 3/15],
        [123.09, 132.48, 130.32, 131.43, 133.43, 123.09, 132.48, 130.32, 131.43, 133.43, 123.09, 132.48, 130.32, 131.43, 133.43]
    ]
     */
    const now = new Date(Date.now())
    const weekAgo = new Date(Date.now() - (15 * 1000 * 86400))
    const end = utils.parseDate(now);
    const start = utils.parseDate(weekAgo)
    const url = `https://api.tiingo.com/tiingo/daily/${symbol}/prices?startDate=${start}&endDate=${end}&token=${api_token}`
    const response = await fetch(url)
    const json = await response.json()
    var filtered = []
    for (var i = 0; i < json.length; i++) {
        var item = json[i];
        var newObj = {
            date: item.date,
            adjClose: item.adjClose
        }
        filtered.push(newObj)
    }
    const monthlyObj = utils.parseAPIdate(filtered, utils.parse15Days)
    return monthlyObj
}

async function fetchOneYear(symbol) {
    /* This function fetches the adjusted closing prices for the given symbol for the last 15 days
    Example Call:
    >>>fetchOneYear(AAPL)
    [
        [Jan, Feb, March, April, May, June, July, Aug, Sep, Oct, Nov, Dec],
        [123.09, 132.48, 130.32, 131.43, 133.43, 123.09, 132.48, 130.32, 131.43, 133.43, 123.09, 132.48]
    ]
     */
    const now = new Date(Date.now())
    const weekAgo = new Date(Date.now() - (360 * 1000 * 86400))
    const end = utils.parseDate(now);
    const start = utils.parseDate(weekAgo)
    const url = `https://api.tiingo.com/tiingo/daily/${symbol}/prices?startDate=${start}&endDate=${end}&token=${api_token}`
    const response = await fetch(url)
    const json = await response.json()
    const filtered = []
    for (var i = 0; i < json.length; i = i + 21) {
        filtered.push(json[i])
    }

    var filterData = []
    for (var i = 0; i < filtered.length; i++) {
        var item = filtered[i];
        var newObj = {
            date: item.date,
            adjClose: item.adjClose
        }
        filterData.push(newObj)
    }
    const yearObj = utils.parseAPIdate(filtered, utils.parseYear)
    return yearObj
}

async function fetchUserSymbols(email) {
    const response = await fetch(`http://localhost:5000/api/get-symbols?Email=${email}`)
    const json = await response.json()
    return json.symbols

}

async function fetchSymbolDescription(symbol) {
    const res = await fetch(`https://api.tiingo.com/tiingo/daily/${symbol}?token=${api_token}`);
    const body = await res.json();
    return body
}



exports.fetchOneDay = fetchOneDay;
exports.fetchOneWeek = fetchOneWeek;
exports.fetch15Days = fetch15Days;
exports.fetchOneYear = fetchOneYear
exports.fetchUserSymbols = fetchUserSymbols
exports.fetchSymbolDescription = fetchSymbolDescription