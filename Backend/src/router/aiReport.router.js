import express from "express";
import { InterviewAiReportController } from "../controller/aiReport.controller.js";
import { Protected } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const interviewReportRouter = express.Router();

/**
 * @route POST - /api/interview/ai-report
 * @access private
 * @returns ai generated Skill gaps [] , score , technical questions , preparation plan & behavioural questions from your input
 *
 */

interviewReportRouter.post(
  "/ai-report",
  Protected,
  upload.single("resume"),
  InterviewAiReportController,
);


export default interviewReportRouter;
