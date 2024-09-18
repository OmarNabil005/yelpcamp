const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/all', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.renderCampground = async (req, res) => {
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
};

module.exports.createCampground = async (req, res) => {
    const campground = new Campground({ ...req.body.campground, author: req.user._id });
    await campground.save();
    req.flash('success', 'Successfully made a campground');
    res.redirect(`/campgrounds/${campground._id}`)
};

module.exports.renderEditCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', `couldn't find campground`);
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
};

module.exports.editCampground = async (req, res,) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    req.flash('success', 'Successfully Updated a campground');
    res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteCampground = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted a campground');
    res.redirect(`/campgrounds`);
};