import express from 'express';
import { createPropertyController, deletePropertyController, getPropertiesController, getPropertyController, updatePropertyController } from "../controllers/property.controller.v2";
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
    .route('/')
    .get(authMiddleware(), getPropertiesController)
    .post(authMiddleware(), createPropertyController);

router
    .route('/:propertyId')
    .get(authMiddleware(), getPropertyController)
    .patch(authMiddleware(), updatePropertyController)
    .delete(authMiddleware(), deletePropertyController);

export default router;
