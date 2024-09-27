# YelpCamp

YelpCamp is a full-stack web application built as part of the **Web Developer Bootcamp** course. This project allows users to explore beautiful campgrounds, leave reviews, and even add their own campgrounds.

You can find the project hosted at: [YelpCamp on Vercel](https://yelpcamp-roan.vercel.app/)

## Built with:
- **Node.js**
- **Express**
- **MongoDB**
- **Bootstrap**

## Features:
- **Browse Campgrounds**: Discover various campgrounds with detailed descriptions.
- **Add Campgrounds**: Share your own campground listings with the community.
- **Leave Reviews**: Provide feedback and rate the campgrounds you've visited.

## Setup

To run this project, you will need the following services:

1. **MongoDB Atlas** for the database.
2. **Cloudinary** for storing images.
3. **MapTiler** for map integration.

### Environment Variables
You need to set up the following environment variables in a `.env` file:

- `CLOUD`: Your Cloudinary cloud name.
- `CLOUD_KEY`: Your Cloudinary API key.
- `CLOUD_API`: Your Cloudinary API secret.
- `DB_URL`: Your MongoDB Atlas connection string.
- `MAPTILER_API_KEY`: Your MapTiler API key.

## Tips to Run the Project

1. **Clone the repository** and navigate to the project’s main directory.

2. Run the following command to install all necessary dependencies:
```bash
   npm install
```
3. After that you can start the project with:
```bash
  npm start
```
This will launch the application, and you can now explore the YelpCamp features.

---

This makes it easy for users to both view the live project and run it locally.
