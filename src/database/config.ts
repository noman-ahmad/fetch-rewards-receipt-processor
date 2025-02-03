import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { v4 as uuidv4 } from "uuid";
import { receiptItems, receipts } from "./schema/receipts";
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

export async function insertIntoTable() {
  // Generate a UUID for the receipt
  const receiptId = uuidv4();

  // Insert the receipt
  await db.insert(receipts).values([
    {
      id: receiptId,
      retailer: "Walmart",
      purchaseDate: "2025-01-30",
      purchaseTime: "08:25",
      total: "25.9",
    },
  ]);

  // Insert related receipt items using the same receiptId
  await db.insert(receiptItems).values([
    {
      id: uuidv4(),
      shortDescription: "Milk",
      price: "2.99",
      receiptId: receiptId,
    },
    {
      id: uuidv4(),
      shortDescription: "Bread",
      price: "1.5",
      receiptId: receiptId,
    },
  ]);

  const allReceipts = await db.query.receipts.findMany({
    with: {
      receiptItems: true,
    },
  });
  console.log(JSON.stringify(allReceipts));
}
