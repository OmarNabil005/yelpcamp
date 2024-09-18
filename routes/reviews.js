const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/middleware/catchAsync');
const validateReview = require('../utilities/middleware/validateReview');
const isReviewAuthor = require('../utilities/middleware/isReviewAuthor');
const reviews = require('../controllers/reviews');

router.post('/', validateReview, catchAsync(reviews.createReview))
router.delete('/:reviewId', isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;