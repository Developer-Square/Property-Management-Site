const express = require('express');
const {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyDetail,
  updateProperty,
} = require('../controllers/property.controller');

const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/').post(createProperty);
router.route('/:id').get(getPropertyDetail);
router.route('/:id').patch(updateProperty);
router.route('/:id').delete(deleteProperty);

module.exports = router;
export {};
