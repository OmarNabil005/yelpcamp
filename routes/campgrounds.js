const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const validateCampground = require('../utilities/validateCampground');
const isLoggedIn = require('../utilities/isLoggedIn');
const isCampgroundAuthor = require('../utilities/isCampgroundAuthor');

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/all', { campgrounds });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', catchAsync(async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', `couldn't find campground`);
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const campground = new Campground({ ...req.body.campground, author: req.user._id });
    await campground.save();
    req.flash('success', 'Successfully made a campground');
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.get('/:id/edit', isLoggedIn, isCampgroundAuthor, catchAsync(async (req, res,) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', `couldn't find campground`);
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}));

router.put('/:id', isLoggedIn, isCampgroundAuthor, validateCampground, catchAsync(async (req, res,) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    req.flash('success', 'Successfully Updated a campground');
    res.redirect(`/campgrounds/${id}`);
}));

router.delete('/:id', isLoggedIn, isCampgroundAuthor, catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted a campground');
    res.redirect(`/campgrounds`);
}));

module.exports = router;