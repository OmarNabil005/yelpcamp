const joi = require('joi');
const review = require('../models/review');

module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().required(),
        location: joi.string().required(),
        price: joi.number().required().min(0),
    }).required()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        author: joi.string().allow('').optional(),
        rating: joi.number().required(true).min(0).max(5),
        text: joi.string().allow('').optional(),
    }).required()
});
