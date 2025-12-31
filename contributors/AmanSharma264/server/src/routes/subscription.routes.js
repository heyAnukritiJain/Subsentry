import express from "express";
import { createSubscription, getSubscription } from "../controllers/subscriptions.controller.js";
import { requireAuth } from "../middlewares/clerk.middleware.js";

const router = express.Router();

router.post("/", requireAuth, createSubscription);
router.get("/", requireAuth, getSubscription);

export default router;