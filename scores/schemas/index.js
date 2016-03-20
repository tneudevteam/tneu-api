const Joi = require('joi');

module.exports = {
    auth: Joi.object().keys({
        username: Joi.string().min(4).max(16).regex(/[A-Za-z0-9\._]/).required(),
        password: Joi.string().min(4).max(16).regex(/[A-Za-z0-9\._]/).required()
    }).unknown(),
    get: Joi.object().keys({
        token: Joi.string().length(26).required()
    }).unknown()
};
