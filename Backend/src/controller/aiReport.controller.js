import Interview from "../model/interviewReport.model.js";
import interviewReport from "../services/ai.services.js";
import { PDFParse } from "pdf-parse";

/**
 * @route POST - /api/interview/ai-report
 * @access private
 * @returns ai generated Skill gaps [] , score , technical questions , preparation plan & behavioural questions from your input
 * @description User Inupt : resume , self descirption , job description - ai will analyze and generate the response
 */
async function InterviewAiReportController(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Resume PDF is required" });
  }
  const { jobDescription, selfDescription } = req.body;
  if (!jobDescription || !selfDescription) {
    return res.status(400).json({
      message: "Job Description or Self Description is Required",
    });
  }
  try {
    const pdfParser = new PDFParse({ data: req.file.buffer });
    const result = await pdfParser.getText();
    const content = result.text;

    const interviewReportGenerateByAi = await interviewReport({
      resume: content,
      jobDescription,
      selfDescription,
    });

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const save = await Interview.create({
      user: req.user.id,
      resume: content,
      selfDescription,
      jobDescription,
      ...interviewReportGenerateByAi,
    });
    console.log(save);
    res.status(200).json({
      message: "PDF parsed successfully",
      save,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", errorMessage: error });
  }
}

export { InterviewAiReportController };
