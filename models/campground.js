const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
});

const opts = { toJSON: {virtuals: true}};

const CampgroundSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    images: [ImageSchema],
    description: {
        type: String,
        required: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,

        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    location: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<h4>${this.title}</h4><h6>${this.location}</h6><p><a id="popup-link" href="/campgrounds/${this._id}">visit</a></p>`;
});

CampgroundSchema.post('findOneAndDelete', async (campground) => {
    if (campground) {
        await Review.deleteMany({
            _id: {
                $in: campground.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);