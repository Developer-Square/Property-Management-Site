const express = require('express');
const {
  getSpecificReviews,
  getReviews,
  createReview,
} = require('../controllers/review.controller');

const router = express.Router();

router.route('/').get(getReviews);
router.route('/').post(createReview);
router.route('/:id').get(getSpecificReviews);

module.exports = router;
export {};
