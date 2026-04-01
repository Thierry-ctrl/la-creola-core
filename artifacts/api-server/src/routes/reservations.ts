import { Router, type IRouter } from "express";
import { CreateReservationBody } from "@workspace/api-zod";
import { db, reservationsTable } from "@workspace/db";

const router: IRouter = Router();

function toDateOnlyString(value: Date) {
  return value.toISOString().slice(0, 10);
}

router.post("/reservations", async (req, res) => {
  const parsed = CreateReservationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid reservation data", details: parsed.error.issues });
    return;
  }

  const [reservation] = await db
    .insert(reservationsTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      date: toDateOnlyString(parsed.data.date),
      time: parsed.data.time,
      guests: parsed.data.guests,
      occasion: parsed.data.occasion ?? null,
      notes: parsed.data.notes ?? null,
    })
    .returning({ id: reservationsTable.id });

  res.status(201).json({
    id: reservation.id,
    message: "Reservation inquiry submitted successfully. We will confirm your booking shortly.",
  });
});

export default router;
