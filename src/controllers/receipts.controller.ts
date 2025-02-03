import { Receipt, ReceiptItem } from "../models/receipts.models";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createReceipt, selectReceipt } from "../repos/receipts.repo";
import { findTotalPointsForReceipt } from "../utils/receipts/points";

export async function processReceipts(
  request: Request<{}, {}, Receipt>,
  response: Response
) {
  try {
    const receipt = request.body;
    const generatedId = uuidv4();
    const { items, ...receiptToInsert } = receipt;
    const receiptItemsToInsert = receipt.items.map((item: ReceiptItem) => {
      return { id: uuidv4(), receiptId: generatedId, ...item };
    });
    await createReceipt({
      receipt: { ...receiptToInsert, id: generatedId },
      items: receiptItemsToInsert,
    });
    response.json({ id: generatedId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
}

export async function getTotalReceiptPoints(
  request: Request,
  response: Response
) {
  try {
    const receiptId = request.params.receiptId;
    const receiptInDb = await selectReceipt(receiptId);
    if (!receiptInDb) {
      response
        .status(404)
        .json({ error: `Receipt with id: ${receiptId} does not exist` });
    } else {
      response.json({ points: findTotalPointsForReceipt(receiptInDb) });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error });
  }
}
