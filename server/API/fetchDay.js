const router = require('express').Router();
const DB = require('../DB/database')
const utils = require('../Utils/utils')
const fetch = require('node-fetch');
const Users = require('../models/Users');

router.get('/fetch-daily', async (req, res) => {
    const today = (utils.parseDate(Date.now()));
    const lastDay = await DB.fetchDayVisited(req.query.Email)
    if (today === lastDay) {
        const data = await DB.fetchUserStockData(req.query.Email)
        res.send(data)
    } else {
        const response = await fetch(`http://localhost:5000/api/fetch-all-symbol-data?Email=${req.query.Email}`);
        const body = await response.json();
        const response2 = await fetch(`http://localhost:5000/api/fetch-one-day?Email=${req.query.Email}`);
        const body2 = await response2.json();
        const newObj = {
            day: today,
            dayData: body,
            dayStats: body2
        }
        const updated = await Users.findOneAndUpdate({ Email: req.query.Email }, { dayVisited: newObj})
        res.send(body)
    }
})

router.get('/fetch-day-stats', async (req, res) => {
    const today = (utils.parseDate(Date.now()));
    const lastDay = await DB.fetchDayVisited(req.query.Email)
    if (today === lastDay) {
        const data = await DB.fetchUserDayStats(req.query.Email)
        res.send(data)
    } else {
        const response = await fetch(`http://localhost:5000/api/fetch-all-symbol-data?Email=${req.query.Email}`);
        const body = await response.json();
        const response2 = await fetch(`http://localhost:5000/api/fetch-one-day?Email=${req.query.Email}`);
        const body2 = await response2.json();
        const newObj = {
            day: today,
            dayData: body,
            dayStats: body2
        }
        const updated = await Users.findOneAndUpdate({ Email: req.query.Email }, { dayVisited: newObj})
        res.send(body2)
    }

})

module.exports = router