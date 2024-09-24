const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:
    {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    },
});

module.exports = {
    cloudinary,
    storage
}