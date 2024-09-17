const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
});

module.exports = mongoose.model('Review', reviewSchema);