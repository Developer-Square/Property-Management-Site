import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { createMessage, queryMessages, getMessageById, updateMessageById, deleteMessageById, getMessageInfoById, getMessageWithUsernames, confirmUserIsSender } from '../services/message.service';
import { IPaginationOptions } from '../mongodb/plugins/paginate';
import { checkUser } from '../services/auth.service';
import { getUserById } from '../services/user.service';

export const createMessageController = catchAsync(async (req: Request, res: Response) => {
  const user = await checkUser(req.user);
  const message = await createMessage(req.body, user);
  res.status(httpStatus.CREATED).send(message);
});

export const getMessageController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['messageId'] === 'string') {
    const user = await checkUser(req.user);
    const message = await getMessageInfoById(new mongoose.Types.ObjectId(req.params['messageId']));
    if (!message) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    await confirmUserIsSender(message.sender, user);
    res.send(message);
  }
});

export const getMessageWithUsernamesController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['messageId'] === 'string') {
    const user = await checkUser(req.user);
    const message = await getMessageWithUsernames(new mongoose.Types.ObjectId(req.params['messageId']));
    if (!message) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
    }
    await confirmUserIsSender(message.sender, user);
    res.send(message);
  }
});

export const updateMessageController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['messageId'] === 'string') {
    const message = await updateMessageById(new mongoose.Types.ObjectId(req.params['messageId']), req.body, req.user);
    res.send(message);
  }
});

export const deleteMessageController = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['messageId'] === 'string') {
    await deleteMessageById(new mongoose.Types.ObjectId(req.params['messageId']), req.user);
    res.status(httpStatus.NO_CONTENT).send();
  }
});
