import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

// This is what creates the in-memory postgres db
const client = new PGlite();
export const db = drizzle({ client, schema });

// This is to seed the In-Memory DB 
// In a real application, you wouldn't do this but run migrations
export async function seedDbTables() {
  try {
    await db.execute(
      `CREATE TABLE IF NOT EXISTS receipts (
         id UUID PRIMARY KEY,
         retailer TEXT NOT NULL,
         purchase_date TEXT NOT NULL,
         purchase_time TEXT NOT NULL,
         total NUMERIC NOT NULL
       );`
    );
    await db.execute(
      `CREATE TABLE IF NOT EXISTS receipt_items (
        id UUID PRIMARY KEY,
        short_description TEXT NOT NULL,
        price NUMERIC NOT NULL,
        receipt_id UUID REFERENCES receipts(id) ON DELETE CASCADE
  );`
    );
  } catch (error) {
    console.error("Error Instantiating In-Memory Database Tables", error);
    throw error;
  }
}
