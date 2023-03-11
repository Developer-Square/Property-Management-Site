import express from 'express';
import {
  createPropertyController,
  deletePropertyController,
  getPropertiesController,
  getPropertyController,
  updatePropertyController,
} from '../controllers/property.controller.v2';
import { createProperty } from '../controllers/property.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.route('/').get(getPropertiesController).post(createProperty);

router
  .route('/:propertyId')
  .get(getPropertyController)
  .patch(updatePropertyController)
  .delete(deletePropertyController);

export default router;
export {};
