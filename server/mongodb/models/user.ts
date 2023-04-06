import mongoose, { Model, Document, Types, FilterQuery } from 'mongoose';
import bcrypt from 'bcryptjs';
import { z } from "zod";
import { AccessAndRefreshTokens } from './token';
import { roles } from '../../config';
import paginate, { IPaginationOptions, QueryResult } from '../plugins/paginate';
import { Roles } from '../../config/roles';
import { IPropertyDoc } from './property';
import toJSON from '../plugins/toJSON';

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    validate(value: string) {
      if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true, // used by the toJSON plugin
  },
  role: {
    type: String,
    enum: roles,
    default: Roles.AGENT,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  avatar: { type: String, required: true },
  properties: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  country: { type: String },
  allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  online: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

userSchema.plugin(paginate);
userSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static('isEmailTaken', async function (email: string, excludeUserId: mongoose.Types.ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash((user.password as string), 8);
  }
  next();
});

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export default User;

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password?: string;
  role: string;
  email_verified: boolean;
  properties?: string;
  phoneNumber?: string;
  gender?: string;
  country?: string;
  allProperties: Types.DocumentArray<mongoose.Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
  online: boolean;
}

export const UserObject = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  avatar: z.string().min(1),
  role: z.nativeEnum(Roles),
  isEmailVerified: z.boolean(),
  properties: z.string().min(1).optional(),
  phoneNumber: z.string().min(1).optional(),
  gender: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  allProperties: z.array(z.instanceof(mongoose.Types.ObjectId)),
  online: z.boolean(),
});

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: FilterQuery<IUserDoc>, options: IPaginationOptions): Promise<QueryResult<IUserDoc>>;
}

export type IUserDocWithProperties = IUserDoc & {
  allProperties: IPropertyDoc[];
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = Omit<IUser, 'role' | 'isEmailVerified'>;

export type NewCreatedUser = Omit<IUser, 'isEmailVerified'>;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}

