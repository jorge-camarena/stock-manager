//Validation API
const Joi = require('joi');

function registerValidation(data) {
    const schema = Joi.object({
        Name: Joi.string().min(6).required(),
        Email: Joi.string().min(6).required(),
        Password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

function loginValidation(data) {
    const schema = Joi.object({
        Email: Joi.string().min(6).required(),
        Password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation