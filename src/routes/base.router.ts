import express from "express";
import { receiptsRouter } from "./receipts/router";

export const appRouter = express.Router(); 

appRouter.use("/receipts", receiptsRouter)
