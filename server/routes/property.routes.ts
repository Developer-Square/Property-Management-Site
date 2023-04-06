import express from 'express';
import { createPropertyController, deletePropertyController, getPropertiesController, getPropertyController, updatePropertyController } from "../controllers/property.controller.v2";
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router
    .route('/')
    .get(getPropertiesController)
    .post(createPropertyController);

router
    .route('/:propertyId')
    .get(getPropertyController)
    .patch(authMiddleware(), updatePropertyController)
    .delete(authMiddleware(), deletePropertyController);

export default router;
