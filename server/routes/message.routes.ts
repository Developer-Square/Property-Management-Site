import express from 'express';
import { createMessageController, deleteMessageController, updateMessageController, getMessageWithUsernamesController } from "../controllers/message.controller";
import { getArchivedRoomsController } from '../controllers/room.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware(), getArchivedRoomsController)
    .post(authMiddleware(), createMessageController);

router
    .route('/:messageId')
    .get(authMiddleware(), getMessageWithUsernamesController)
    .patch(authMiddleware(), updateMessageController)
    .delete(authMiddleware(), deleteMessageController);

export default router;
