const Property = require('../mongodb/models/property');
const User = require('../mongodb/models/user');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {};
const getPropertyDetail = async (req, res) => {};
const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, price, location, photo, email } =
      req.body;

    // Start a new Mongodb session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      price,
      location,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(201).json({ message: 'Property created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};

module.exports = {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
export {};
