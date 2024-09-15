const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const validateCampground = require('../utilities/validateCampground');

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/all', { campgrounds });
}));

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', catchAsync(async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if (!campground) {
        req.flash('error', `couldn't find campground`);
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

router.post('/', validateCampground, catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a campground');
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.get('/:id/edit', catchAsync(async (req, res,) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', `couldn't find campground`);
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}));

router.put('/:id', validateCampground, catchAsync(async (req, res,) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground);
    req.flash('success', 'Successfully Updated a campground');
    res.redirect(`/campgrounds/${id}`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a campground');
    res.redirect(`/campgrounds`);
}));

module.exports = router;