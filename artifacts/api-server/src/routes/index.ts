import { Router } from "express";
import healthRouter from "./health.js";
import reservationsRouter from "./reservations.js";
import newsletterRouter from "./newsletter.js";
import inquiriesRouter from "./inquiries.js";

const router = Router();

router.use(healthRouter);
router.use(reservationsRouter);
router.use(newsletterRouter);
router.use(inquiriesRouter);

export default router;
