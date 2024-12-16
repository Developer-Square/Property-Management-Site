import express from "express";
import { findNearestPropertiesController } from "../controllers/property.controller.v2";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").get(authMiddleware(), findNearestPropertiesController);

export default router;
export {};
