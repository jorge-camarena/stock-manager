const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./ValidationAndVerification/validation')
const User = require('./models/Users');
require('dotenv').config()

//CREATE USER API
router.post('/create-user', async (req, res) => {
    //Validate registration inputs
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //Check if email already exists
    const alreadyExists = await User.findOne({Email: req.body.Email});
    if (alreadyExists) return res.status(400).send('Email already exists');

    //Generate salt, safely store password in DB
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password, salt);
    const newUser = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: hashPassword,
        Symbol: [],
        dayVisited: null
    })
    try {
        const savedUser = await newUser.save()
        res.send({
            success: true,
            message: 'Successfully created account',
            savedUser
        }
        )
    } catch(error) {
        res.send({
            error
        })
        console.log(error)
    }
})


//LOGIN VALIDATION AND SESSION API
router.post('/login', async (req, res) => {
    //Validation login inputs
    //TODO: sanitize input 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email exists (in DB)
    const user = await User.findOne({Email: req.body.Email});
    if (!user) return res.status(400).send({
        login: false,
        message: 'User does not exist'
    });
    //Check if Password is correct
    const validPass = await bcrypt.compare(req.body.Password, user.Password);
    if (!validPass) return res.status(400).send({
        login: false,
        message: 'Invalid Username or Password'
    });
    //Create and assign session token
    const envSecret = process.env.SECRET;
    const token = jwt.sign({ _id: user._id }, envSecret);

    res.header('auth-token', token).send({
        login: true,
        token: token,
        Name: user.Name,
        Email: user.Email
    });

})

module.exports = router