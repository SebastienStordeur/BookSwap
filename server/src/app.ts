import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);
app.use(express.json());

export default app;
