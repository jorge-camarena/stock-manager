const router = require('express').Router();
const User = require('./models/Users');
const fetch_data = require('./Utils/fetch_data')
const tiingo = require('./Tiingo_API')
const utils =  require('./Utils/utils');

//Add Symbol to user DataBase API
router.post('/add-symbol', async (req, res) => {
    var user = await User.findOne({
        Email: req.body.Email
    })
    console.log(user.dayVisited)
    if (!user.Symbols.includes(req.body.Symbol)) {
        const dayStat = await fetch_data.fetchOneDay(req.body.Symbol);
        const stockDataObj = await fetchOneSymbol(req.body.Symbol)
        console.log(stockDataObj)
    
        user.Symbols.push(req.body.Symbol)
        user.dayVisited.dayData[req.body.Symbol] = stockDataObj;
        user.dayVisited.dayStats.push({
            name: req.body.Symbol,
            info: dayStat
        });
        user.markModified('dayVisited')
        const updated = await user.save()
        res.send({
            message: "Successfully added symbol to DB",
            symbols: user.Symbols
            
        })
    } else {
        res.send({
            message: `${req.body.Symbol} is already in your portfolio`,
            symbols: user.Symbols
        })
    }
})


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

module.exports =  router;