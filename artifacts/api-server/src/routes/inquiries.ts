import { Router } from "express";
import { CreateInquiryBody } from "@workspace/api-zod";
import { db, inquiriesTable } from "@workspace/db";

const router = Router();

function toDateOnlyString(value: Date) {
  return value.toISOString().slice(0, 10);
}

router.post("/inquiries", async (req: any, res: any) => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid inquiry data", details: parsed.error.issues });
    return;
  }

  const [inquiry] = await db
    .insert(inquiriesTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      eventType: parsed.data.eventType,
      guestCount: parsed.data.guestCount ?? null,
      preferredDate: parsed.data.preferredDate ? toDateOnlyString(parsed.data.preferredDate) : null,
      message: parsed.data.message,
    })
    .returning({ id: inquiriesTable.id });

  res.status(201).json({
    id: inquiry.id,
    message: "Your inquiry has been received. Our events team will contact you within 24 hours.",
  });
});

export default router;
