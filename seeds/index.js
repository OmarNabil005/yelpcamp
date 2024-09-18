const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; ++i) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae culpa sunt a, asperiores necessitatibus deserunt suscipit, at nulla, omnis quidem magnam. Ipsa, dicta. Similique natus a veniam, ipsum in sit!',
            price: rand1000,
            author: '66e85ac18b368fbaa7c99d30',
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close;
});