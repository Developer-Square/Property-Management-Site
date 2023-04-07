import mongoose, { Document, FilterQuery, Model, Types } from 'mongoose';
import { toZod } from 'tozod';
import { z } from 'zod';
import { paginate, IPaginationOptions, QueryResult, toJSONWithId } from '../plugins';
import { IRoomDoc } from './room';
import { IUserDoc } from './user';

export const MessageSchema = new mongoose.Schema<IMessageDoc, IMessageModel>(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        sent: {
            type: Boolean,
            default: true,
        },
    },{
        timestamps: true,
    }
);

export interface IMessage {
    text: string;
    sender: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
    sent: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessageDoc extends IMessage, Document {}

export interface IMessageModel extends Model<IMessageDoc> {
    paginate(filter: FilterQuery<IMessageDoc>, options: IPaginationOptions): Promise<QueryResult<IMessageDoc>>;
    list(filter: FilterQuery<IMessageDoc>, options: IPaginationOptions): Promise<QueryResult<IMessageDoc>>;
}

export type IMessageWithUserDetails = IMessageDoc & {
    sender: IUserDoc,
}

export type IMessageWithPopulated = IMessageDoc & {
    room: IRoomDoc,
    sender: IUserDoc,
}

export type IMessageWithUsernames = IMessageDoc & {
    sender: IUserDoc['name'],
}

export const MessageObject = z.object({
    text: z.string().min(1),
    sender: z.instanceof(mongoose.Types.ObjectId),
    createdAt: z.date(),
    updatedAt: z.date(),
    sent: z.boolean(),
});

MessageSchema.static('list', async function(filter: FilterQuery<IMessageDoc>, options: IPaginationOptions): Promise<QueryResult<IMessageDoc>>{
    let sortingCriteria: any = { createdAt: 'desc' };
    if (options._sort && options._order) {
      sortingCriteria = { [options._sort]: options._order };
    }

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).limit(options._end ?? 10).skip(options._start ?? 0).sort(sortingCriteria).populate([{
        path: 'sender',
        transform: doc => doc == null ? null : doc.name
    }]).populate([{
        path: 'recipient',
        transform: doc => doc == null ? null : doc.name
    }]).exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
        const [count, docs] = values;
        const result = {
          docs,
          count,
        };
        return Promise.resolve(result);
    });
})

MessageSchema.plugin(paginate);
MessageSchema.plugin(toJSONWithId);

const Message = mongoose.model<IMessageDoc, IMessageModel>('Message', MessageSchema);

export default Message;

export type CreateMessageParams = IMessage & {
    recipient: Types.Subdocument<Types.ObjectId> & Types.ObjectId;
}

export type DeleteMessageParams = {
    messageId: mongoose.Types.ObjectId;
    roomId: mongoose.Types.ObjectId;
}
