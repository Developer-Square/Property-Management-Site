import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import {
  createUser,
  queryUsers,
  updateUserById,
  deleteUserById,
  getUserInfoById,
} from '../services/user.service';
import { IPaginationOptions } from '../mongodb/plugins/paginate';
import { IUserDoc } from '../mongodb/models/user';

export const createUserController = catchAsync(
  async (req: Request, res: Response) => {
    const user = await createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  }
);

export const getUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const filter: FilterQuery<IUserDoc> = pick(req.query, [
      'name',
      'role',
      'name_like',
    ]);
    if (filter.hasOwnProperty('name_like')) {
      filter.name = { $regex: filter.name_like, $options: 'i' };
      delete filter.name_like;
    }
    const options: IPaginationOptions = pick(req.query, [
      '_start',
      '_end',
      '_sort',
      '_order',
    ]);
    const { docs, count } = await queryUsers(filter, options);
    res.header('x-total-count', String(count));
    res.header('Access-Control-Expose-Headers', 'x-total-count');
    res.send(docs);
  }
);

export const getUserController = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params['userId'] === 'string') {
      const user = await getUserInfoById(
        new mongoose.Types.ObjectId(req.params['userId'])
      );
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }
      res.send(user);
    }
  }
);

export const updateUserController = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params['userId'] === 'string') {
      const user = await updateUserById(
        new mongoose.Types.ObjectId(req.params['userId']),
        req.body,
        req.user
      );
      res.send(user);
    }
  }
);

export const deleteUserController = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params['userId'] === 'string') {
      await deleteUserById(
        new mongoose.Types.ObjectId(req.params['userId']),
        req.user
      );
      res.status(httpStatus.NO_CONTENT).send();
    }
  }
);
