import express from 'express';
import {
  createReviewController,
  getReviewController,
  getReviewsController,
} from '../controllers/review.controller.v2';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
  .route('/')
  .get(authMiddleware(), getReviewsController)
  .post(authMiddleware(), createReviewController);
router.route('/:reviewId').get(authMiddleware(), getReviewController);

export default router;
