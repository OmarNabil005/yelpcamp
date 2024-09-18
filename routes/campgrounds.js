const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/middleware/catchAsync');
const validateCampground = require('../utilities/middleware/validateCampground');
const isLoggedIn = require('../utilities/middleware/isLoggedIn');
const isCampgroundAuthor = require('../utilities/middleware/isCampgroundAuthor');
const campgrounds = require('../controllers/campgrounds');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.renderCampground))
    .put(isLoggedIn, isCampgroundAuthor, validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isCampgroundAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isCampgroundAuthor, catchAsync(campgrounds.renderEditCampground));

module.exports = router;