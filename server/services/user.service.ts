import httpStatus from 'http-status';
import mongoose, { FilterQuery } from 'mongoose';
import User, { IUser, IUserDoc, IUserDocWithProperties } from '../mongodb/models/user';
import { ApiError } from '../errors';
import { IPaginationOptions, QueryResult } from '../mongodb/plugins/paginate';
import { uploadOnePhoto } from './cloudinary.service';
import Property from '../mongodb/models/property';

/**
 * Create a user
 * @param {IUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: IUser): Promise<IUserDoc> => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    if (userBody.avatar){
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
export const queryUsers = async (filter: FilterQuery<IUserDoc>, options: IPaginationOptions): Promise<QueryResult<IUserDoc>> => {
    const { docs, count} = await User.paginate(filter, options);
    return { docs, count };
};

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id);

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDocWithProperties | null>}
 */
export const getUserInfoById = async (id: mongoose.Types.ObjectId): Promise<IUserDocWithProperties | null> => User.findById(id).populate('allProperties');

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });

/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {Partial<IUser>} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (
    userId: mongoose.Types.ObjectId,
    updateBody: Partial<IUser>
  ): Promise<IUserDoc | null> => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    if (updateBody.avatar){
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
export const deleteUserById = async (userId: mongoose.Types.ObjectId): Promise<void> => {
    const user = await getUserInfoById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    if (user.allProperties.length) {
        user.allProperties.map(async (id) => {
            const session = await mongoose.startSession();
            session.startTransaction();
            const property = await Property.findOne({ _id: id });
    
            if (!property) throw new ApiError(httpStatus.NOT_FOUND, 'Property not found!');
    
            property.remove({ session });
            await session.commitTransaction();
        });
    }

    user.remove({ session });
    await session.commitTransaction();
};