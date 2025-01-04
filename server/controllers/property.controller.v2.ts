import {
  findNearestProperties,
  getPropertyInfoById,
} from "./../services/property.service";
import httpStatus from "http-status";
import { Request, Response } from "express";
import mongoose, { FilterQuery } from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import {
  createProperty,
  queryProperties,
  updatePropertyById,
  deletePropertyById,
} from "../services/property.service";
import { IPaginationOptions } from "../mongodb/plugins/paginate";
import { checkUser } from "../services/auth.service";

export const createPropertyController = catchAsync(
  async (req: Request, res: Response) => {
    const user = await checkUser(req.user);
    const property = await createProperty(req.body, user);
    res.status(httpStatus.CREATED).send(property);
  }
);

export const getPropertiesController = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, [
      "propertyType",
      "propertyStatus",
      "title_like",
    ]);
    if (filter.hasOwnProperty("title_like")) {
      filter.title = { $regex: filter.title_like, $options: "i" };
      delete filter.title_like;
    }
    const options: IPaginationOptions = pick(req.query, [
      "_start",
      "_end",
      "_sort",
      "_order",
    ]);
    const { docs, count } = await queryProperties(filter, options);
    res.header("x-total-count", String(count));
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.send(docs);
  }
);

export const getPropertyController = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["propertyId"] === "string") {
      const property = await getPropertyInfoById(
        new mongoose.Types.ObjectId(req.params["propertyId"])
      );
      if (!property) {
        throw new ApiError(httpStatus.NOT_FOUND, "Property not found");
      }
      res.send(property);
    }
  }
);

export const updatePropertyController = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["propertyId"] === "string") {
      const property = await updatePropertyById(
        new mongoose.Types.ObjectId(req.params["propertyId"]),
        req.body,
        req.user
      );
      res.send(property);
    }
  }
);

export const deletePropertyController = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["propertyId"] === "string") {
      await deletePropertyById(
        new mongoose.Types.ObjectId(req.params["propertyId"]),
        req.user
      );
      res.status(httpStatus.NO_CONTENT).send();
    }
  }
);

export const findNearestPropertiesController = catchAsync(async (req, res) => {
  const nearestLocations = await findNearestProperties(
    req.query.longitude,
    req.query.latitude,
    req.query.maxDistance
  );
  if (nearestLocations.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Properties not found");
  }
  res.send({ results: nearestLocations });
});
