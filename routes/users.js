const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/middleware/catchAsync');
const storeReturnTo = require('../utilities/middleware/storeReturnTo');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.createUser))

router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/login' }), catchAsync(users.loginUser));

router.post('/logout', users.logoutUser);

module.exports = router;