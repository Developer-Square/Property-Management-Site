import mongoose, { Document, FilterQuery, Model } from 'mongoose';
import paginate, { IPaginationOptions, QueryResult } from '../plugins/paginate';
import { z } from "zod";
import { createSchema } from '../../utils/createSchema';
import { toJSON } from '../plugins';

const reviewSchema = new mongoose.Schema<IReviewDoc, IReviewModel>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  status: { type: String, required: true },
}, {
  timestamps: true,
});

reviewSchema.plugin(paginate);
reviewSchema.plugin(toJSON);

const Review = mongoose.model<IReviewDoc, IReviewModel>('Review', reviewSchema);

export default Review;

export interface IReview {
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  status: string;
}

export const ReviewObject = createSchema<IReview>().with({
  name: z.string().min(1),
  avatar: z.string().min(1),
  comment: z.string().min(1),
  rating: z.number(),
  status: z.string().min(1)
})

export interface IReviewDoc extends IReview, Document {}

export interface IReviewModel extends Model<IReviewDoc> {
  paginate(filter: FilterQuery<IReviewDoc>, options: IPaginationOptions): Promise<QueryResult<IReviewDoc>>;
}
