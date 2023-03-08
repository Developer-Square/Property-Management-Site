import express from 'express';
import { getSpecificReviews } from '../controllers/review.controller';
import { createReviewController, getReviewController, getReviewsController } from '../controllers/review.controller.v2';

const router = express.Router();

router.route('/').get(getReviewsController);
router.route('/').post(createReviewController);
// TODO Change this to get review by id
router.route('/:reviewId').get(getSpecificReviews);

export default router;
