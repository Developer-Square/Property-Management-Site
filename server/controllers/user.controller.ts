import User from '../mongodb/models/user';
const Property = require('../mongodb/models/property');
import mongoose from 'mongoose';
const cloudinary = require('cloudinary').v2;

export const getAllUsers = async (req, res) => {
  try {
    const query = {};
    const { _end, _start, name_like = '' } = req.query;

    if (name_like !== '') {
      // @ts-ignore
      query.name = { $regex: name_like, $options: 'i' };
    }

    const count = await Property.countDocuments({ query });

    const users = await User.find(query).limit(_end).skip(_start);

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      email,
      name,
      properties,
      gender,
      phoneNumber,
      country,
      avatar,
      type,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(200).json(userExists);
    }

    if (type === 'agent') {
      const photoUrl = await cloudinary.uploader.upload(avatar);
      const newUser = await User.create({
        email,
        name,
        properties,
        phoneNumber,
        gender,
        country,
        avatar: photoUrl.url,
      });

      return res.status(201).json(newUser);
    }

    const newUser = await User.create({
      email,
      name,
      avatar,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, properties, gender, phoneNumber, country, avatar } =
      req.body;
    let photoUrl;

    if (!avatar.includes('https://res.cloudinary.com')) {
      const uploadPhoto = await cloudinary.uploader.upload(avatar);
      photoUrl = uploadPhoto.url;
    } else {
      photoUrl = avatar;
    }

    if (photoUrl) {
      await User.findByIdAndUpdate(
        { _id: id },
        {
          email,
          name,
          properties,
          gender,
          phoneNumber,
          country,
          avatar: photoUrl,
        }
      );

      res.status(200).json({ message: 'User updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).populate('allProperties');

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userToDelete = await User.findOne({ _id: id }).populate(
      'allProperties'
    );

    if (!userToDelete) throw new Error('Property not found!');

    const properties = userToDelete.allProperties;

    if (properties && properties.length) {
      properties.map(async (id) => {
        const propertyToDelete = await Property.findOne({ _id: id });

        if (!propertyToDelete) throw new Error('Property not found!');

        propertyToDelete.remove();
      });
    }

    userToDelete.remove();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserInfoByID,
  deleteUser,
};
export {};
