import httpStatus from 'http-status';
import mongoose, { FilterQuery } from 'mongoose';
import Review, { IReview, IReviewDoc } from '../mongodb/models/review';
import { ApiError } from '../errors';
import { IPaginationOptions, QueryResult } from '../mongodb/plugins/paginate';
import { uploadManyPhotos } from './cloudinary.service';

/**
 * Create a review
 * @param {IReview} reviewBody
 * @returns {Promise<IReviewDoc>}
 */
export const createReview = async (reviewBody: IReview): Promise<IReviewDoc> => {
    return Review.create(reviewBody);
};

/**
 * Query for properties
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryReviews = async (filter: FilterQuery<IReviewDoc>, options: IPaginationOptions): Promise<QueryResult<IReviewDoc>> => {
    const { docs, count } = await Review.paginate(filter, options);
    return { docs, count } ;
};

/**
 * Get review by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IReviewDoc | null>}
 */
export const getReviewById = async (id: mongoose.Types.ObjectId): Promise<IReviewDoc | null> => Review.findById(id);
