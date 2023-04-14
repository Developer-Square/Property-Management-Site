import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import { IUserDoc } from '../mongodb/models/user';
import Room, { IRoom, IRoomDoc, IRoomPopulated, IRoomWithAdmin, IRoomWithMessages, RoomTypes } from '../mongodb/models/room';
import { Message } from '../mongodb/models';
import { checkUser } from './auth.service';

/**
 * Create a room
 * @param {IRoom} roomBody
 * @returns {Promise<IRoomDoc>}
 */
export const createRoom = async (roomBody: IRoom): Promise<IRoomDoc> => Room.create(roomBody);

/**
 * Gets the messages for every room that a user is in minus archived rooms.
 * @param user logged in user
 * @returns messages of the logged in user for every room where they are members
 */
export const queryRooms = async (user: IUserDoc): Promise<IRoomPopulated[]> => Room.find({ members: { $in: [new mongoose.Types.ObjectId(user.id)] }, archived: false }).populate('messages').populate({ path: 'members', match: { _id: { $ne: new mongoose.Types.ObjectId(user.id) }} });

/**
 * Gets the messages for every room that a user is in
 * @param user logged in user
 * @returns messages of the logged in user for every room where they are members
 */
export const queryRoomsWithArchived = async (user: IUserDoc): Promise<IRoomPopulated[]> => Room.find({ members: { $in: [new mongoose.Types.ObjectId(user.id)] } }).populate('messages').populate({ path: 'members', match: { _id: { $ne: new mongoose.Types.ObjectId(user.id) }} });

/**
 * Finds all rooms that the logged in user is in
 * @param user logged in user
 * @returns all the rooms the logged in user is in
 */
export const getAllRooms = async (user: IUserDoc): Promise<IRoomDoc[]> => Room.find({ members: { $in: [new mongoose.Types.ObjectId(user.id)] } });

/**
 * Gets a room that both users belong to
 * @param userA id of the first user
 * @param userB id of the second user
 * @returns room that they both belong to
 */
export const getPeerToPeerRoom = async (userA: mongoose.Types.ObjectId, userB: mongoose.Types.ObjectId): Promise<IRoomDoc | null> => Room.findOne({ members: { $all: [new mongoose.Types.ObjectId(userA),new mongoose.Types.ObjectId(userB)]}});

/**
 * Get room by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IRoomDoc | null>}
 */
export const getRoomById = async (id: mongoose.Types.ObjectId): Promise<IRoomDoc | null> => Room.findById(id);

/**
 * Get room by id with Messages
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IRoomWithMessages | null>}
 */
export const getRoomWithMessages = async (id: mongoose.Types.ObjectId): Promise<IRoomWithMessages | null> => Room.findById(id).populate('messages');

/**
 * Get room by id with admin
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IRoomWithAdmin | null>}
 */
export const getRoomWithAdmin = async (id: mongoose.Types.ObjectId): Promise<IRoomWithAdmin | null> => Room.findById(id).populate('admin');

/**
 * Checks if the logged in user is the room admin
 * @param admin room admin
 * @param user logged in user
 * @returns true if the logged in user is the room admin, otherwise null
 */
export const isUserRoomAdmin = async (admin: IRoom['admin'], user?: IUserDoc): Promise<boolean | null | undefined> => user && admin && admin.toString() === user.id.toString();

/**
 * Checks if the logged in user belongs to a chatroom
 * @param user logged in user
 * @param room chat room
 * @returns true if the user is a member of the chatroom
 */
export const isUserMember = async (user: IUserDoc, room: IRoomDoc): Promise<boolean> => room.members.includes(user.id);

/**
 * checks if the logged in user is a member of the chatroom
 * @param user logged in user
 * @param room chatroom
 */
export const checkUserIsMember = async (user: IUserDoc, room: IRoomDoc) => {
    if (!(room.members.includes(user.id))){
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not a member of this chatroom');
    }
}

/**
 * Update room by id
 * @param {mongoose.Types.ObjectId} roomId
 * @param {Partial<IRoom>} updateBody
 * @returns {Promise<IRoomDoc | null>}
 */
export const updateRoomById = async (
    roomId: mongoose.Types.ObjectId,
    updateBody: Partial<IRoom>,
    loggedInUser?: Express.User
  ): Promise<IRoomDoc | null> => {
    const user = await checkUser(loggedInUser);
    const room = await getRoomWithAdmin(roomId);
    if (!room) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Chatroom not found');
    }
    if (room.type === RoomTypes.GROUP && !isUserRoomAdmin(room.admin, user)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not the admin of this chatroom');
    }

    Object.assign(room, updateBody);
    await room.save();
    return room;
};

/**
 * Delete room by id
 * @param {mongoose.Types.ObjectId} roomId
 * @returns {Promise<void>}
 */
export const deleteRoomById = async (
    roomId: mongoose.Types.ObjectId, 
    loggedInUser?: Express.User
): Promise<void> => {
    const user = await checkUser(loggedInUser);
    const room = await getRoomWithAdmin(roomId);
    if (!room) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Chatroom not found');
    }
    if (room.type === RoomTypes.GROUP && !isUserRoomAdmin(room.admin, user)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not the admin of this chatroom');
    }

    if (room.messages && room.messages.length) {
        room.messages.map(async (id) => {
            const message = await Message.findById(id);

            if (message) {
                await message.remove();
            }
        });
    }

    await room.remove();
};