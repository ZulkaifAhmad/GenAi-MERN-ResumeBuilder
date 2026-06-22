import express from "express";
import cookieParser from "cookie-parser";
import router from "./router/auth.router.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

export { app };