const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserInfoByID,
  deleteUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserInfoByID);
router.route('/:id').delete(deleteUser);

module.exports = router;
export {};
