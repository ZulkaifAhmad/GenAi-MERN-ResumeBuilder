import express from "express";
import { InterviewAiReportController, GetMyReportsController } from "../controller/aiReport.controller.js";
import { Protected } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const interviewReportRouter = express.Router();


interviewReportRouter.post(
  "/ai-report",
  Protected,
  upload.single("resume"),
  InterviewAiReportController,
);


interviewReportRouter.get(
  "/my-reports",
  Protected,
  GetMyReportsController,
);

export default interviewReportRouter;
