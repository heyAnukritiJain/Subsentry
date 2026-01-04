import { Router } from "express";
import { createSubscription, getSubscription } from "../Controller/Subscription.controller.js";

const router = Router();

router.get("/get", getSubscription);
router.post('/', createSubscription);

export default router;