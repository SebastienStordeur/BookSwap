import express from "express";
import cors from "cors";
import helmet from "helmet";

import userRouter from "./routes/userRoutes";
import itemRouter from "./routes/itemRouter";

const app = express();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);

export default app;
