import express from 'express';
import { getSpecificReviews } from '../controllers/review.controller';
import { createReviewController, getReviewController, getReviewsController } from '../controllers/review.controller.v2';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware(), getReviewsController)
    .post(authMiddleware(), createReviewController);
// TODO Change this to get review by id
router.route('/:reviewId').get(getSpecificReviews);

export default router;
