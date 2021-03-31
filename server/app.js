const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const User = require('./models/Users');;
const mongoose = require('mongoose');
const addSymbol = require('./add-stock');
const authRoute = require('./auth')
const fetchRoute = require('./Tiingo_API')
const getDay = require('./API/fetchDay')
const searchSymbol = require('./API/searchSymbol')
require('dotenv').config()


//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

//Stock-App API Calls
app.use('/api', addSymbol)
app.use('/api', authRoute)
app.use('/api', fetchRoute)
app.use('/api', getDay)
app.use('/api', searchSymbol)

app.get('/api/get-symbols', async (req, res) => {
    //This fetches all of our symbols
    const user = await User.findOne({ Email: req.query.Email});
    
    res.send({
        message: 'Successfully retrieved user symbol',
        email: await user.Email,
        symbols: await user.Symbols
    })
})

// Connect to DB
const uri = process.env.DB_CONNECTION;
mongoose.connect(
    uri,
    {useNewUrlParser: true,
    useUnifiedTopology: true},
    
    () => console.log('Connected to DB')
);   

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.listen(5000, () => {
    console.log('Listening on port 5000')
})

// sudo killall -9 node