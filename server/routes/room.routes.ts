import express from 'express';
import { createRoomController, deleteRoomController, getRoomController, getRoomsController, updateRoomController } from '../controllers/room.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware(), getRoomsController)
    .post(authMiddleware(),createRoomController);

router
    .route('/:roomId')
    .get(authMiddleware(), getRoomController)
    .patch(authMiddleware(), updateRoomController)
    .delete(authMiddleware(), deleteRoomController);

export default router;
