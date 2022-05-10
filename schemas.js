const Joi = require('joi');

module.exports.bookingSchema = Joi.object({
    booking: Joi.object({
        serviceNumber: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }).required()
});