import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { config } from '../config';
import Token, { AccessAndRefreshTokens, ITokenDoc, TokenTypes } from '../mongodb/models/token';
import { ApiError } from '../errors';
import User from '../mongodb/models/user';

/**
 * Generate token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @returns {string}
 */
 export const generateToken = (
    userId: mongoose.Types.ObjectId,
    expires: Moment,
    type: string,
  ): string => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, config.jwt.secret);
  };
  
  /**
   * Save a token
   * @param {string} token
   * @param {mongoose.Types.ObjectId} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {boolean} [blacklisted]
   * @returns {Promise<ITokenDoc>}
   */
  export const saveToken = async (
    token: string,
    userId: mongoose.Types.ObjectId,
    expires: Moment,
    type: string,
    blacklisted: boolean = false
  ): Promise<ITokenDoc> => {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };
  
  /**
   * Verify token and return token doc (or throw an error if it is not valid)
   * @param {string} token
   * @param {string} type
   * @returns {Promise<ITokenDoc>}
   */
  export const verifyToken = async (token: string, type: string): Promise<ITokenDoc> => {
    const payload = jwt.verify(token, config.jwt.secret);
    if (typeof payload.sub !== 'string') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'bad user');
    }
    const tokenDoc = await Token.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
    }
    return tokenDoc;
  };
  
  /**
   * Generate auth tokens
   * @param {any} user
   * @returns {Promise<AccessAndRefreshTokens>}
   */
  export const generateAuthTokens = async (user: any): Promise<AccessAndRefreshTokens> => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user._id, accessTokenExpires, TokenTypes.ACCESS);
  
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user._id, refreshTokenExpires, TokenTypes.REFRESH);
    await saveToken(refreshToken, user._id, refreshTokenExpires, TokenTypes.REFRESH);
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };
  
  /**
   * Generate reset password token
   * @param {string} email
   * @returns {Promise<string>}
   */
  export const generateResetPasswordToken = async (email: string): Promise<string> => {
    const user = await User.findOne({ email});
    if (!user) {
      throw new ApiError(httpStatus.NO_CONTENT, '');
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const resetPasswordToken = generateToken(user._id, expires, TokenTypes.RESET_PASSWORD);
    await saveToken(resetPasswordToken, user._id, expires, TokenTypes.RESET_PASSWORD);
    return resetPasswordToken;
  };
  
/**
 * Generate verify email token
 * @param {any} user
 * @returns {Promise<string>}
 */
export const generateVerifyEmailToken = async (user: any): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user._id, expires, TokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user._id, expires, TokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
