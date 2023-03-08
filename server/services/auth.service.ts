import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import Token, { TokenTypes } from '../mongodb/models/token';
import User, { IUser, IUserDoc, IUserWithTokens } from '../mongodb/models/user';
import cloudinary from './cloudinary.service';
import { verifyToken, generateAuthTokens } from './token.service';
import { getUserByEmail, getUserById, updateUserById } from './user.service';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
export const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<IUserDoc> => {
    const user = await getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

/**
 * Login with google
 * @param {IUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const loginUserWithGoogle = async (userBody: IUser): Promise<IUserDoc> => {
    const user = getUserByEmail(userBody.email);
    if (user) {
        return user as Promise<IUserDoc>;
    }
    if (userBody.avatar){
        const photoUrl = await cloudinary.uploader.upload(userBody.avatar);
        Object.assign(userBody, { avatar: photoUrl });
    }
    return User.create(userBody);
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
export const logout = async (refreshToken: string): Promise<void> => {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: TokenTypes.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<IUserWithTokens>}
 */
export const refreshAuth = async (refreshToken: string): Promise<IUserWithTokens> => {
    const refreshTokenDoc = await verifyToken(refreshToken, TokenTypes.REFRESH);
    const user = await getUserById(new mongoose.Types.ObjectId(refreshTokenDoc.user));
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await refreshTokenDoc.remove();
    const tokens = await generateAuthTokens(user);
    return { user, tokens };
};
  
/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
export const resetPassword = async (resetPasswordToken: any, newPassword: string): Promise<void> => {
    const resetPasswordTokenDoc = await verifyToken(resetPasswordToken, TokenTypes.RESET_PASSWORD);
    const user = await getUserById(new mongoose.Types.ObjectId(resetPasswordTokenDoc.user));
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: TokenTypes.RESET_PASSWORD });
};
  
/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<IUserDoc | null>}
 */
export const verifyEmail = async (verifyEmailToken: any): Promise<IUserDoc | null> => {
    const verifyEmailTokenDoc = await verifyToken(verifyEmailToken, TokenTypes.VERIFY_EMAIL);
    const user = await getUserById(new mongoose.Types.ObjectId(verifyEmailTokenDoc.user));
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await Token.deleteMany({ user: user.id, type: TokenTypes.VERIFY_EMAIL });
    const updatedUser = await updateUserById(user.id, { isEmailVerified: true });
    return updatedUser;
};

/**
 * Checks whether logged in user is valid
 * @param user logged in user
 * @returns logged in user
 */
export const checkUser = (user?: Express.User): IUserDoc => {
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
    return user as IUserDoc;
}