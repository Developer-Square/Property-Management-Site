import httpStatus from "http-status";
import mongoose, { FilterQuery } from "mongoose";
import Property, {
  IProperty,
  IPropertyDoc,
  IPropertyWithUserDetails,
} from "../mongodb/models/property";
import { ApiError } from "../errors";
import { IPaginationOptions, QueryResult } from "../mongodb/plugins/paginate";
import { uploadManyPhotos } from "./cloudinary.service";
import { IUserDoc } from "../mongodb/models/user";
import { confirmUserPermissions } from "./auth.service";

/**
 * Create a property
 * @param {IProperty} propertyBody
 * @param {IUserDoc} user logged in user
 * @returns {Promise<IPropertyDoc>}
 */
export const createProperty = async (
  propertyBody: IProperty,
  user: IUserDoc
): Promise<IPropertyDoc> => {
  const photos = await uploadManyPhotos(propertyBody.photos);
  const property = await Property.create({
    ...propertyBody,
    creator: user._id,
    photos,
  });
  user.allProperties.push(property._id);
  await user.save();
  return property;
};

/**
 * Query for properties
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult<IPropertyDoc>>}
 */
export const queryProperties = async (
  filter: FilterQuery<IPropertyDoc>,
  options: IPaginationOptions
): Promise<QueryResult<IPropertyDoc>> => {
  const { docs, count } = await Property.paginate(filter, options);
  return { docs, count };
};

/**
 * Find nearby properties
 * @param {Number} longitude
 * @param {Number} latitude
 * @param {Number} maxDistance (default = 5)
 * @returns {Promise<Array<IPropertyDoc>>} An array of documents nearest to the given location
 */
export const findNearestProperties = async (
  longitude: string,
  latitude: string,
  maxDistance: string
): Promise<Array<IPropertyDoc>> => {
  const lnglat: [number, number] = [
    parseFloat(longitude),
    parseFloat(latitude),
  ];
  const pipeline = [
    {
      $geoNear: {
        distanceField: "address.distance",
        near: lnglat,
        distanceMultiplier: 6371,
        spherical: true,
        key: "lnglat",
        maxDistance:
          parseInt(maxDistance, 10) > 0
            ? parseInt(maxDistance, 10) / 6371
            : 5 / 6371,
      },
    },
  ];

  return Property.aggregate(pipeline);
};

/**
 * Get property by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IPropertyDoc | null>}
 */
export const getPropertyById = async (
  id: mongoose.Types.ObjectId
): Promise<IPropertyDoc | null> => Property.findById(id);

/**
 * Get property by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IPropertyWithUserDetails | null>}
 */
export const getPropertyInfoById = async (
  id: mongoose.Types.ObjectId
): Promise<IPropertyWithUserDetails | null> =>
  Property.findById(id).populate("creator");

/**
 * Update property by id
 * @param {mongoose.Types.ObjectId} propertyId
 * @param {Partial<IProperty>} updateBody
 * @returns {Promise<IPropertyDoc | null>}
 */
export const updatePropertyById = async (
  propertyId: mongoose.Types.ObjectId,
  updateBody: Partial<IProperty>,
  loggedInUser?: Express.User
): Promise<IPropertyDoc | null> => {
  const property = await getPropertyInfoById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, "Property not found");
  }
  await confirmUserPermissions(property.creator, loggedInUser);

  if (updateBody.photos) {
    const uploadedPhotos = await uploadManyPhotos(updateBody.photos);
    Object.assign(updateBody, { photos: uploadedPhotos });
  }

  Object.assign(property, updateBody);
  await property.save();
  return property;
};

/**
 * Delete property by id
 * @param {mongoose.Types.ObjectId} propertyId
 * @returns {Promise<void>}
 */
export const deletePropertyById = async (
  propertyId: mongoose.Types.ObjectId,
  loggedInUser?: Express.User
): Promise<void> => {
  const property = await getPropertyInfoById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, "Property not found");
  }
  await confirmUserPermissions(property.creator, loggedInUser);

  property.remove();
  property.creator.allProperties.pull(property);

  await property.creator.save();
};
