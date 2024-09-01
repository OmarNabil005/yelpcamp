const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', () => {
    resizeBy.send("Hello There");
})

app.get('/makeCampground', async (req, res) => {
    const camp = new Campground({ title: "Egy", price: "200B$", description: "Hell on Earth", location: "North East Africa" });
    await camp.save();
    console.log(camp);
    res.send("Done");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})