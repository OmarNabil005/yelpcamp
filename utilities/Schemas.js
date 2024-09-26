const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extenstion = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const joi = baseJoi.extend(extenstion);

module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required().escapeHTML(),
        description: joi.string().required().escapeHTML(),
        // images: joi.array().required(),
        location: joi.string().required().escapeHTML(),
        price: joi.number().required().min(0),
    }).required(),
    deleteImages: joi.array(),

});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required(true).min(0).max(5),
        text: joi.string().required(true).escapeHTML(),
    }).required()
});