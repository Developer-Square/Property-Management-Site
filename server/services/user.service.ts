import httpStatus from 'http-status';
import mongoose, { FilterQuery } from 'mongoose';
import User, {
  IUser,
  IUserDoc,
  IUserDocWithProperties,
} from '../mongodb/models/user';
import { ApiError } from '../errors';
import { IPaginationOptions, QueryResult } from '../mongodb/plugins/paginate';
import { uploadOnePhoto } from './cloudinary.service';
import Property from '../mongodb/models/property';
import { confirmUserPermissions } from './auth.service';

/**
 * Create a user
 * @param {IUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: IUser): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (userBody.avatar) {
    const avatar = await uploadOnePhoto(userBody.avatar);
    Object.assign(userBody, { avatar });
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (
  filter: FilterQuery<IUserDoc>,
  options: IPaginationOptions
): Promise<QueryResult<IUserDoc>> => {
  const { docs, count } = await User.paginate(filter, options);
  return { docs, count };
};

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (
  id: mongoose.Types.ObjectId
): Promise<IUserDoc | null> => User.findById(id);

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
 export const getUserByIdAlt = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id).select('-allProperties');

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDocWithProperties | null>}
 */
export const getUserInfoById = async (
  id: mongoose.Types.ObjectId
): Promise<IUserDocWithProperties | null> =>
  User.findById(id).populate('allProperties');

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> =>
  User.findOne({ email });

/**
 * Get user by name
 * @param {string} name
 * @returns {Promise<IUserDoc | null>}
 */
 export const getUserByName = async (name: string): Promise<IUserDoc | null> => User.findOne({ name });


/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {Partial<IUser>} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: Partial<IUser>,
  loggedInUser?: Express.User
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await confirmUserPermissions(user, loggedInUser);
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if (updateBody.avatar) {
    const newAvatar = await uploadOnePhoto(updateBody.avatar);
    Object.assign(updateBody, { avatar: newAvatar });
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<void>}
 */
export const deleteUserById = async (
  userId: mongoose.Types.ObjectId,
  loggedInUser?: Express.User
): Promise<void> => {
  const user = await getUserInfoById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await confirmUserPermissions(user, loggedInUser);
  if (user.allProperties.length) {
    user.allProperties.map(async (id) => {
      const property = await Property.findOne({ _id: id });

      if (!property)
        throw new ApiError(httpStatus.NOT_FOUND, 'Property not found!');

      await property.remove();
    });
  }

  await user.remove();
};

/**
 * Checks if a user exists. Useful for updates or inserts which have a user field
 * @param userId id of the user. Is optional because the user could be absent in update body
 * @param description optional description e.g. sender, recipient
 */
export const confirmUserExists = async (userId?: mongoose.Types.ObjectId, description?: string) => {
    if (userId) {
        const user = await getUserById(userId);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, `${description ?? 'User'} not found`);
        }
    }
}
