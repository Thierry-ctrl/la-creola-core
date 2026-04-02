import { defineConfig } from "drizzle-kit";
import path from "path";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  schema: [
    path.join(__dirname, "./src/schema/reservations.ts"),
    path.join(__dirname, "./src/schema/newsletter.ts"),
    path.join(__dirname, "./src/schema/inquiries.ts"),
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
