const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        min: 6
    },
    Email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    Password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    Symbols: {
        type: [String],
        required: true,
    },
    dayVisited: {
        type: Object
    }

});

module.exports = mongoose.model('Users', userSchema);