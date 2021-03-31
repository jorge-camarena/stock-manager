const router = require('express').Router();
const utils =  require('./Utils/utils');
const fetch_data = require('./Utils/fetch_data')


async function fetchOneSymbol(symbol) {
    const oneWeek = await fetch_data.fetchOneWeek(symbol);
    const oneMonth = await fetch_data.fetch15Days(symbol);
    const oneYear = await fetch_data.fetchOneYear(symbol)
    return {
        oneWeek: oneWeek,
        oneMonth: oneMonth,
        oneYear: oneYear
    }
}

router.get('/fetch-all-symbol-data', async (req, res) => {
    var data = {}
    const symbols = await fetch_data.fetchUserSymbols(req.query.Email)
    for (var i = 0; i < symbols.length; i++) {
        var item = symbols[i];
        var symbolData = await fetchOneSymbol(item)
        data[item] = symbolData
    }
    res.json(data)
})

router.get('/fetch-one-day', async (req, res) => {
    const symbols = await fetch_data.fetchUserSymbols(req.query.Email)
    const dayInfo = []
    for (var i = 0; i < symbols.length; i++) {
        var item = symbols[i];
        const dayStats = await fetch_data.fetchOneDay(item);
        dayInfo.push({
            name: [item][0],
            info: dayStats
        })
    }
    res.send(dayInfo)
})

router.get('/fetch-description', async (req, res) => {
    const description = await fetch_data.fetchSymbolDescription(req.query.symbol);
    res.send(description)
})

exports.fetchOneSymbol = fetchOneSymbol
module.exports = router