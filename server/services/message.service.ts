import httpStatus from 'http-status';
import mongoose, { FilterQuery, Types } from 'mongoose';
import Message, { CreateMessageParams, DeleteMessageParams, IMessage, IMessageDoc, IMessageWithPopulated, IMessageWithUserDetails, IMessageWithUsernames } from '../mongodb/models/message';
import { ApiError } from '../errors';
import { IPaginationOptions, QueryResult } from '../mongodb/plugins/paginate';
import { confirmUserPermissions } from './auth.service';
import { IUserDoc } from '../mongodb/models/user';
import { IRoomDoc } from '../mongodb/models/room';
import { createRoom, getRoomById } from './room.service';

/**
 * Create a message
 * @param {IMessage} messageBody
 * @param {IUserDoc} user logged in user
 * @returns {Promise<IMessageDoc>}
 */
export const createMessage = async ({ members, room, ...params }: CreateMessageParams, user: IUserDoc): Promise<IMessageDoc> => {
    let chatroom: IRoomDoc | null;
    if (!room) {
        chatroom = await createRoom({ members });
    } else {
        chatroom = await getRoomById(room);
    }
    if (!chatroom) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong. We couldn"t create a chatroom');
    }
    const message = await Message.create({ ...params, room: chatroom.id, sender: user._id });
    chatroom.messages?.push(message.id);
    await chatroom.save();
    return message;
};

/**
 * Query for messages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult<IMessageDoc>>}
 */
export const queryMessages = async (filter: FilterQuery<IMessageDoc>, options: IPaginationOptions): Promise<QueryResult<IMessageDoc>> => {
    const { docs, count } = await Message.list(filter, options);
    return { docs, count };
};

/**
 * Get message by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IMessageDoc | null>}
 */
export const getMessageById = async (id: mongoose.Types.ObjectId): Promise<IMessageDoc | null> => Message.findById(id);

/**
 * Get message with user info by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IMessageWithUserDetails | null>}
 */
export const getMessageInfoById = async (id: mongoose.Types.ObjectId): Promise<IMessageWithUserDetails | null> => Message.findById(id).populate('sender');

/**
 * Get message with user info by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IMessageWithUserDetails | null>}
 */
export const getMessageWithRoomDetails = async (id: mongoose.Types.ObjectId): Promise<IMessageWithPopulated| null> => Message.findById(id).populate('room');

/**
 * Get message with user info by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IMessageWithUsernames | null>}
 */
export const getMessageWithUsernames = async (id: mongoose.Types.ObjectId): Promise<IMessageWithUserDetails | null> => Message.findById(id).populate([{
    path: 'sender',
    transform: doc => doc == null ? null : doc.name
}]);

/**
 * Update message by id
 * @param {mongoose.Types.ObjectId} messageId
 * @param {Partial<IMessage>} updateBody
 * @returns {Promise<IMessageDoc | null>}
 */
export const updateMessageById = async (
    messageId: mongoose.Types.ObjectId,
    updateBody: Partial<IMessage>,
    loggedInUser?: Express.User
  ): Promise<IMessageDoc | null> => {
    const message = await getMessageInfoById(messageId);
    if (!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    await confirmUserPermissions(message.sender, loggedInUser);

    Object.assign(message, updateBody);
    await message.save();
    return message;
};

/**
 * Delete message by id
 * @param {mongoose.Types.ObjectId} messageId
 * @returns {Promise<void>}
 */
export const deleteMessageById = async (
    messageId: mongoose.Types.ObjectId,
    loggedInUser?: Express.User,
): Promise<void> => {
    const message = await getMessageWithRoomDetails(messageId);
    if (!message) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    await confirmUserPermissions(message.sender, loggedInUser);
    message.room.messages?.pull(message.id);
    await message.room.save();

    await message.remove();
};

export const confirmUserIsSender = async (sender: IUserDoc, loggedInUser: IUserDoc) => {
    if (sender._id.toString() !== loggedInUser._id.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden: You can't access other people's messages");
    }
    return Promise.resolve();
}