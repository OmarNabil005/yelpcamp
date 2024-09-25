const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    const title = "Register";
    res.render('users/register', { title });
};

module.exports.createUser = async (req, res) => {
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
};

module.exports.renderLoginForm = (req, res) => {
    const title = "Login";
    res.render('users/login', { title });
};

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out');
        return res.redirect('/campgrounds');
    });
};