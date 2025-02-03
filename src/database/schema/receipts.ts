import { pgTable, uuid, text, numeric } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const receipts = pgTable("receipts", {
  id: uuid("id").primaryKey(),
  retailer: text().notNull(),
  purchaseDate: text("purchase_date").notNull(),
  purchaseTime: text("purchase_time").notNull(),
  total: numeric().notNull(),
});

export const receiptItems = pgTable("receipt_items", {
  id: uuid("id").primaryKey(),
  shortDescription: text("short_description").notNull(),
  price: numeric().notNull(),
  receiptId: uuid("receipt_id"),
});

export const receiptRelations = relations(receipts, ({ many }) => ({
  receiptItems: many(receiptItems),
}));

export const receiptItemsRelations = relations(receiptItems, ({ one }) => ({
  receipt: one(receipts, {
    fields: [receiptItems.receiptId],
    references: [receipts.id],
  }),
}));
