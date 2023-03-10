import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { createReview, queryReviews, getReviewById } from '../services/review.service';
import { IPaginationOptions } from '../mongodb/plugins/paginate';

export const createReviewController = catchAsync(async (req: Request, res: Response) => {
  const review = await createReview(req.body);
  res.status(httpStatus.CREATED).send(review);
});

export const getReviewsController = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['status']);
  const options: IPaginationOptions = pick(req.query, ['_start', '_end', '_sort', '_order']);
  const { docs, count } = await queryReviews(filter, options);
  res.header('x-total-count', String(count));
  res.header('Access-Control-Expose-Headers', 'x-total-count');
  res.send(docs);
});

export const getReviewController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['reviewId'] === 'string') {
    const review = await getReviewById(new mongoose.Types.ObjectId(req.params['reviewId']));
    if (!review) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
    }
    res.send(review);
  }
});
