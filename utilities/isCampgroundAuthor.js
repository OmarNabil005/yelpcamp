const Campground = require('../models/campground');
const catchAsync = require('./catchAsync');

const isCampgroundAuthor = (catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', `You don't have permission to do that`);
        return res.redirect(`/campgrounds/${campground._id}`);
    }
    next();
}));

module.exports = isCampgroundAuthor;