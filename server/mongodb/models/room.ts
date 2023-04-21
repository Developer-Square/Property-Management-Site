import mongoose, { Document, FilterQuery, Model, Types } from 'mongoose';
import { toZod } from 'tozod';
import { z } from 'zod';
import { paginate, IPaginationOptions, QueryResult, toJSONWithId } from '../plugins';
import { IMessageDoc } from './message';
import { IUserDoc } from './user';

export enum RoomTypes {
    PEERTOPEER = 'PeerToPeer',
    GROUP = 'group',
}

const RoomSchema = new mongoose.Schema<IRoomDoc, IRoomModel>(
    {
        members: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                trim: true,
            }],
            index: true,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        avatar: {
            type: String,
            trim: true,
            default: null,
        },
        description: {
            type: String,
            trim: true,
            default: null,
        },
        name: {
            type: String,
            trim: true,
            default: null,
        },
        type: {
            type: String,
            enum: Object.values(RoomTypes),
            default: RoomTypes.PEERTOPEER,
        },
        messages: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
            }],
            default: [],
        },
        archived: {
            type: Boolean,
            default: false,
        },
    },{
        timestamps: true,
    }
);

export interface IRoom {
    members: Types.DocumentArray<mongoose.Types.ObjectId>;
    admin?: mongoose.Types.ObjectId | null;
    avatar?: string | null;
    description?: string | null;
    name?: string | null;
    type?: RoomTypes;
    messages?: Types.DocumentArray<mongoose.Types.ObjectId>;
    archived?: boolean;
}

export interface IRoomDoc extends IRoom, Document {}

export interface IRoomModel extends Model<IRoomDoc> {
    paginate(filter: FilterQuery<IRoomDoc>, options: IPaginationOptions): Promise<QueryResult<IRoomDoc>>;
}

export type IRoomWithMessages = IRoomDoc & {
    messages: Types.DocumentArray<IMessageDoc>;
};

export type IRoomPopulated = IRoomDoc & {
    messages: Types.DocumentArray<IMessageDoc>;
    members: Types.DocumentArray<IUserDoc>;
};

export type IRoomWithAdmin = IRoomDoc & {
    admin: IUserDoc;
};

RoomSchema.plugin(paginate);
RoomSchema.plugin(toJSONWithId);

const Room = mongoose.model<IRoomDoc, IRoomModel>('Room', RoomSchema);

export default Room;