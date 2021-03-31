const Users = require("../models/Users");

async function fetchDayVisited(email) {
    //Returns dayVisited object from DB. Returns either Date Object or Null
    const user = await Users.findOne({ Email: email });
    if (user.dayVisited === null) {
        return null
    } else {
        return user.dayVisited.day
    }
}

async function fetchUserStockData(email) {
    const user = await Users.findOne({ Email: email })
    return user.dayVisited.dayData
}
async function fetchUserDayStats(email) {
    const user = await Users.findOne({ Email: email })
    return user.dayVisited.dayStats
}

async function fetchUser(email) {
    const user = await Users.findOne({ Email: email });
    return user
}
async function fetchUserSymbols(email) {
    const user = await Users.findOne({ Email: email });
    return user.Symbols

}

exports.fetchDayVisited = fetchDayVisited;
exports.fetchUserSymbols = fetchUserSymbols
exports.fetchUserStockData = fetchUserStockData
exports.fetchUserDayStats = fetchUserDayStats
exports.fetchUser = fetchUser

