import { Router } from "express";
import { SubscribeNewsletterBody } from "@workspace/api-zod";
import { db, getDatabaseConfigErrorMessage, newsletterTable } from "@workspace/db";

const router = Router();

router.post("/newsletter", async (req: any, res: any) => {
  if (!db) {
    res.status(503).json({ error: getDatabaseConfigErrorMessage() ?? "Database unavailable" });
    return;
  }

  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email", details: parsed.error.issues });
    return;
  }

  try {
    await db
      .insert(newsletterTable)
      .values({
        email: parsed.data.email,
        firstName: parsed.data.firstName ?? null,
      });

    res.status(201).json({
      message: "You're subscribed! Be the first to know about special events and seasonal menus.",
    });
  } catch (err: any) {
    if (err?.code === "23505") {
      res.status(409).json({ message: "This email is already subscribed." });
      return;
    }
    throw err;
  }
});

export default router;
