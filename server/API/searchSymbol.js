const router = require('express').Router()
const fetch_data = require('../Utils/fetch_data');
const User = require('../models/Users')

router.get('/search-symbol', async (req, res) => {
    try {
        var user = await User.findOne({
            Email: req.query.Email
        })
        const description = await fetch_data.fetchSymbolDescription(req.query.symbol);
        const dayStats = await fetch_data.fetchOneDay(req.query.symbol);

        if (!user.Symbols.includes(req.query.symbol)) {
            res.send({
                exists: true,
                alreadyAdded: false,
                name: description.name,
                symbol: description.ticker,
                adjOpen: dayStats.dayStats.adjOpen,
                adjLow: dayStats.dayStats.adjLow,
                adjHigh: dayStats.dayStats.adjHigh,
                desc: description.description,
                index: description.exchangeCode
            })
        } else {
            res.send({
                exists: true,
                alreadyAdded: true,
                name: description.name,
                symbol: description.ticker,
                adjOpen: dayStats.dayStats.adjOpen,
                adjLow: dayStats.dayStats.adjLow,
                adjHigh: dayStats.dayStats.adjHigh,
                desc: description.description,
                index: description.exchangeCode
            })

        }
    } catch (err) {
        console.log(err)
        res.status(404).send({
            exists: false,
            alreadyAdded: false,
            message: `${req.query.symbol} is not a valid symbol. Please try searching for valid a symbol`
        })
    }
})

router.get('/search-symbol-graph', async (req, res) => {
    const data = await fetch_data.fetchOneYear(req.query.symbol);
    res.send(data)

})

module.exports = router