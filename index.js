if (process.env.NODE_ENV !== "production")
    require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoose = require('mongoose');
const catchAsync = require('./utilities/middleware/catchAsync');
const ExpressError = require('./utilities/expressError');
const isLoggedIn = require('./utilities/middleware/isLoggedIn');
const User = require('./models/user');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');
const users = require('./routes/users');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const mongoStore = require('connect-mongo');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize({
    replaceWith: '_',
  }));
app.use(helmet());

const scriptSrcUrls = [
    "https://cdn.maptiler.com/",
];
const styleSrcUrls = [
    "https://cdn.maptiler.com/",
];
const connectSrcUrls = [
    "https://api.maptiler.com/", 
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dxbyeoe2t/",
                "https://api.maptiler.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(methodOverride('_method'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static('public'));

const secret = process.env.SECRET || "ASFB@!$RASGt1412raFAWRQ#@Rawr4";

const store = mongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret,
    }
});

store.on("error", function(e) {
    console.log("Session Store Error!", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/user', users);
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', isLoggedIn, reviews);

app.get('/', catchAsync(async (req, res) => {
    res.render("home");
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    if (!err.message) err.message = 'Oh no! something went wrong';
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).render('error', { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});