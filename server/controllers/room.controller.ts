import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import { checkUser } from '../services/auth.service';
import { checkUserIsMember, createRoom, deleteRoomById, getRoomWithMessages, queryRooms, queryRoomsWithArchived, updateRoomById } from '../services/room.service';

export const createRoomController = catchAsync(async (req: Request, res: Response) => {
  const room = await createRoom(req.body);
  res.status(httpStatus.CREATED).send(room);
});

export const getRoomsController = catchAsync(async (req: Request, res: Response) => {
  const user = await checkUser(req.user);
  const rooms = await queryRooms(user);
  res.send(rooms);
});

export const getArchivedRoomsController = catchAsync(async (req: Request, res: Response) => {
    const user = await checkUser(req.user);
    const rooms = await queryRoomsWithArchived(user);
    res.send(rooms);
});

export const getRoomController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roomId'] === 'string') {
    const user = await checkUser(req.user);
    const room = await getRoomWithMessages(new mongoose.Types.ObjectId(req.params['roomId']));
    if (!room) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Chatroom not found');
    }
    await checkUserIsMember(user, room);
    res.send(room);
  }
});

export const updateRoomController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roomId'] === 'string') {
    const message = await updateRoomById(new mongoose.Types.ObjectId(req.params['roomId']), req.body, req.user);
    res.send(message);
  }
});

export const deleteRoomController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['roomId'] === 'string') {
    await deleteRoomById(new mongoose.Types.ObjectId(req.params['roomId']), req.user);
    res.status(httpStatus.NO_CONTENT).send();
  }
});
