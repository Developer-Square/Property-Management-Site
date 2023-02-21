const User = require('../mongodb/models/user');
const cloudinary = require('cloudinary').v2;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .limit(req.query._end)
      .skip(req.query._start);

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
      firstName,
      lastName,
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
        name: `${firstName} ${lastName}`,
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

module.exports = { getAllUsers, createUser, getUserInfoByID };
export {};
