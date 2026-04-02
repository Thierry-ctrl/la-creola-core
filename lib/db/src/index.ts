import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

const { Pool } = pg;
const missingDatabaseUrlMessage =
  "DATABASE_URL must be set. Did you forget to provision a database?";
const databaseUrl = process.env.DATABASE_URL?.trim();

export const databaseConfigError = databaseUrl
  ? null
  : new Error(missingDatabaseUrlMessage);

export const pool = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : null;
export const db = pool ? drizzle(pool, { schema }) : null;

export function isDatabaseConfigured() {
  return db !== null;
}

export function getDatabaseConfigErrorMessage() {
  return databaseConfigError?.message ?? null;
}

export * from "./schema/index.js";
