import mongoose, { Document, FilterQuery, Model } from "mongoose";
import { z } from "zod";
import { createSchema } from "../../utils/createSchema";
import { toJSON, paginate, IPaginationOptions, QueryResult } from "../plugins";
import { IUserDoc } from "./user";

interface IPoint {
  type: string;
  coordinates: [number, number];
}

export interface IProperty {
  title: string;
  description: string;
  propertyType: string;
  propertyStatus: string;
  location: string;
  lnglat: IPoint;
  price: number;
  photos: string[];
  creator: mongoose.Types.ObjectId;
}

// export const PropertyObject = createSchema<IProperty>().with({
//   title: z.string().min(1),
//   description: z.string().min(1),
//   propertyType: z.string().min(1),
//   propertyStatus: z.string().min(1),
//   location: z.string().min(1),
//   lnglat: z.object({
//     type: z.string(),
//     coordinates: z.number().array().length(2),
//   }),
//   price: z.number(),
//   photos: z.array(z.string()),
//   creator: z.instanceof(mongoose.Types.ObjectId),
// });

export interface IPointDoc extends IPoint, Document {}
export interface IPropertyDoc extends IProperty, Document {}

export interface IPropertyModel extends Model<IPropertyDoc> {
  paginate(
    filter: FilterQuery<IPropertyDoc>,
    options: IPaginationOptions
  ): Promise<QueryResult<IPropertyDoc>>;
}
export interface IPointModel extends Model<IPointDoc> {
  paginate(
    filter: FilterQuery<IPointDoc>,
    options: IPaginationOptions
  ): Promise<QueryResult<IPointDoc>>;
}

export type IPropertyWithUserDetails = IPropertyDoc & {
  creator: IUserDoc;
};

const pointSchema = new mongoose.Schema<IPointDoc, IPointModel>({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const propertySchema = new mongoose.Schema<IPropertyDoc, IPropertyModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    propertyType: { type: String, required: true },
    propertyStatus: { type: String, required: true },
    location: { type: String, required: true },
    lnglat: {
      type: pointSchema,
      index: "2dsphere", // Create a special 2dsphere index on `property.lnglat`
      required: true,
    },
    price: { type: Number, required: true },
    photos: [{ type: String, required: true }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

pointSchema.plugin(toJSON);
pointSchema.plugin(paginate);

propertySchema.plugin(paginate);
propertySchema.plugin(toJSON);

const Property = mongoose.model<IPropertyDoc, IPropertyModel>(
  "Property",
  propertySchema
);

export default Property;
