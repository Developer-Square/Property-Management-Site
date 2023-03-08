import express from 'express';
import { createPropertyController, deletePropertyController, getPropertiesController, getPropertyController, updatePropertyController } from "../controllers/property.controller.v2";

const router = express.Router();

router.route('/').get(getPropertiesController);
router.route('/').post(createPropertyController);
router.route('/:propertyId').get(getPropertyController);
router.route('/:propertyId').patch(updatePropertyController);
router.route('/:propertyId').delete(deletePropertyController);

export default router;
