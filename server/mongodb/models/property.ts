import mongoose, { Document, FilterQuery, Model } from 'mongoose';
import { z } from "zod";
import { createSchema } from '../../utils/createSchema';
import paginate, { IPaginationOptions, QueryResult } from "../plugins/paginate";
import { IUserDoc } from './user';

const propertySchema = new mongoose.Schema<IPropertyDoc, IPropertyModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  propertyStatus: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  photos: [{ type: String, required: true }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
},
{
  timestamps: true,
});

propertySchema.plugin(paginate);

const Property = mongoose.model<IPropertyDoc, IPropertyModel>('Property', propertySchema);

export default Property;

export interface IProperty {
  title: string;
  description: string;
  propertyType: string;
  propertyStatus: string;
  location: string;
  price: number;
  photos: string[];
  creator: mongoose.Schema.Types.ObjectId;
}

export const PropertyObject = createSchema<IProperty>().with({
  title: z.string().min(1),
  description: z.string().min(1),
  propertyType: z.string().min(1),
  propertyStatus: z.string().min(1),
  location: z.string().min(1),
  price: z.number(),
  photos: z.array(z.string()),
  creator: z.instanceof(mongoose.Schema.Types.ObjectId),
});

export interface IPropertyDoc extends IProperty, Document {}

export interface IPropertyModel extends Model<IPropertyDoc> {
  paginate(filter: FilterQuery<IPropertyDoc>, options: IPaginationOptions): Promise<QueryResult<IPropertyDoc>>;
}

export type IPropertyWithUserDetails = IPropertyDoc & {
  creator: IUserDoc;
}
