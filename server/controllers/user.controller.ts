const User = require('../mongodb/models/user');

const getAllUsers = async (req, res) => {};
const createUser = async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(200).json(userExists);
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
const getUserInfoByID = async (req, res) => {};

module.exports = { getAllUsers, createUser, getUserInfoByID };
export {};
