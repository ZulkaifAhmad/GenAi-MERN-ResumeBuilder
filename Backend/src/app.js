import express from "express";
import cookieParser from "cookie-parser";
import router from "./router/auth.router.js";

const app = express();
app.use(express.json());
app.use(express.Router());
app.use(cookieParser());


app.use("/api/auth" , router)

export {app};