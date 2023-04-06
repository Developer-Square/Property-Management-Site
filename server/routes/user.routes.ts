import express from 'express';
import { createUserController, getUsersController, getUserController, updateUserController, deleteUserController } from '../controllers/user.controller.v2';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
  .route('/')
  .post(createUserController)
  .get(getUsersController);
router
  .route('/:userId')
  .get(getUserController)
  .patch(authMiddleware(), updateUserController)
  .delete(authMiddleware(), deleteUserController);

export default router;
