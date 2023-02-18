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

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = '',
    propertyType = '',
    propertyStatus = '',
  } = req.query;

  const query = {};

  if (propertyType !== '') {
    // @ts-ignore
    query.propertyType = propertyType;
  }

  if (propertyStatus !== '') {
    // @ts-ignore
    query.propertyStatus = propertyStatus;
  }

  if (title_like !== '') {
    // @ts-ignore
    query.title = { $regex: title_like, $options: 'i' };
  }

  try {
    const count = await Property.countDocuments({ query });

    const result = await Property.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPropertyDetail = async (req, res) => {
  const { id } = req.params;
  const propertyExists = await Property.findOne({ _id: id }).populate(
    'creator'
  );

  if (propertyExists) {
    res.status(200).json(propertyExists);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
};
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      propertyStatus,
      price,
      location,
      photos,
      email,
    } = req.body;
    const cloudinaryLinks = [];

    // Start a new Mongodb session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    photos.map(async (item) => {
      const photoUrl = await cloudinary.uploader.upload(item.url);
      cloudinaryLinks.push(photoUrl.url);

      if (cloudinaryLinks.length === photos.length) {
        const newProperty = await Property.create({
          title,
          description,
          propertyType,
          propertyStatus,
          price,
          location,
          photos: cloudinaryLinks,
          creator: user._id,
        });

        user.allProperties.push(newProperty._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(201).json({ message: 'Property created successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyToDelete = await Property.findOne({ _id: id });

    if (!propertyToDelete) throw new Error('Property not found!');

    const session = await mongoose.startSession();
    session.startTransaction();

    propertyToDelete.remove({ session });
    propertyToDelete.creator.allProperties.pull(propertyToDelete);

    await propertyToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
export {};
