import express from "express";
import { appRouter } from "./routes/base.router";
import { seedDbTables } from "./database/config";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", appRouter);

app.listen(port, async () => {
  await seedDbTables();
  console.log(`Server is running on port ${port}`);
});
