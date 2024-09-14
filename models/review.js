const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    text: {
        type: String,
    },
    author: {
        type: String,
    },
});

module.exports = mongoose.model('Review', reviewSchema);