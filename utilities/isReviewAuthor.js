const Review = require('../models/review');
const catchAsync = require('./catchAsync');

const isReviewAuthor = (catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', `You don't have permission to do that`);
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}));

module.exports = isReviewAuthor;