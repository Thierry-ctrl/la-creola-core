import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reservationsRouter from "./reservations";
import newsletterRouter from "./newsletter";
import inquiriesRouter from "./inquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reservationsRouter);
router.use(newsletterRouter);
router.use(inquiriesRouter);

export default router;
