import express from "express";
import { Request, Response, NextFunction } from "express";
import { Receipt } from "../../models/receipts.models";
import {
  getTotalReceiptPoints,
  processReceipts,
} from "../../controllers/receipts.controller";

export const receiptsRouter = express.Router();

receiptsRouter.get(
  "/:receiptId/points",
  async (request: Request, response: Response) => {
    return getTotalReceiptPoints(request, response);
  }
);

receiptsRouter.post(
  "/process",
  async (request: Request<{}, {}, Receipt>, response: Response) => {
    return processReceipts(request, response);
  }
);
