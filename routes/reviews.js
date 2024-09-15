const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const validateReview = require('../utilities/validateReview');

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully submitted a review');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review');
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;