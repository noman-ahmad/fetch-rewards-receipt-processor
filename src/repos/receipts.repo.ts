import { db } from "../database/config";
import { receiptItems, receipts } from "../database/schema";

type CreateReceiptType = {
  receipt: typeof receipts.$inferInsert;
  items: (typeof receiptItems.$inferInsert)[];
};

export type SelectReceiptType = typeof receipts.$inferSelect & {
  receiptItems: (typeof receiptItems.$inferSelect)[];
};

export async function createReceipt(
  toCreate: CreateReceiptType
): Promise<void> {
  try {
    await db.insert(receipts).values(toCreate.receipt);
    await db.insert(receiptItems).values(toCreate.items);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function selectReceipt(
  id: string
): Promise<SelectReceiptType | undefined> {
  try {
    const receiptWithItems = await db.query.receipts.findFirst({
      where: (receipt, { eq }) => eq(receipt.id, id),
      with: {
        receiptItems: true,
      },
    });
    return receiptWithItems;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
