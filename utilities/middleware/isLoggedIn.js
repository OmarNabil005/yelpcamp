const isLoggedIn = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You need to be logged in to access this page');
        return res.redirect('/user/login');
    }
    next();
})

module.exports = isLoggedIn;