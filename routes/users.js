const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const storeReturnTo = require('../utilities/storeReturnTo');
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body.user;
        const user = new User({ email, username });
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to yelpcamp!')
            res.redirect('/campgrounds');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/user/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/login' }), catchAsync(async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
}))

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out');
        return res.redirect('/campgrounds');
    });
});

module.exports = router;