import express from "express";
import { findNearestPropertiesController } from "../controllers/property.controller.v2";

const router = express.Router();

router.route("/").get(findNearestPropertiesController);

export default router;
export {};
