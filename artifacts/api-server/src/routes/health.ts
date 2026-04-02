import { Router } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { getDatabaseConfigErrorMessage, isDatabaseConfigured } from "@workspace/db";

const router = Router();

function respondWithHealth(res: any) {
  const configured = isDatabaseConfigured();
  const data = HealthCheckResponse.parse({
    status: configured ? "ok" : "degraded",
  });

  res.status(configured ? 200 : 503).json({
    ...data,
    database: configured ? "available" : "missing_configuration",
    message: getDatabaseConfigErrorMessage(),
  });
}

router.get("/", (_req: any, res: any) => {
  respondWithHealth(res);
});

router.get("/healthz", (_req: any, res: any) => {
  respondWithHealth(res);
});

export default router;
