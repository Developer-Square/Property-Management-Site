import mongoose, { Document, Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { z } from "zod";
import { createSchema } from '../../utils/createSchema';

export enum TokenTypes {
    ACCESS = 'access',
    REFRESH = 'refresh',
    RESET_PASSWORD = 'resetPassword',
    VERIFY_EMAIL = 'verifyEmail',
}

const TokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: String,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(TokenTypes),
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Token = mongoose.model<ITokenDoc, ITokenModel>('Token', TokenSchema);

export default Token;

export interface IToken {
  token: string;
  user: string;
  type: TokenTypes;
  expires: Date;
  blacklisted: boolean;
}

export const TokenObject = createSchema<IToken>().with({
    token: z.string().min(1),
    user: z.string().min(1),
    type: z.nativeEnum(TokenTypes),
    expires: z.date(),
    blacklisted: z.boolean()
})

export type NewToken = Omit<IToken, 'blacklisted'>;

export interface ITokenDoc extends IToken, Document {}

export interface ITokenModel extends Model<ITokenDoc> {}

export interface IPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

export interface TokenPayload {
  token: string;
  expires: Date;
}

export interface AccessAndRefreshTokens {
  access: TokenPayload;
  refresh: TokenPayload;
}
