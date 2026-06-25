import Interview from "../model/interviewReport.model.js";
import interviewReport from "../services/ai.services.js";

async function InterviewAiReportController(req, res) {
  const { jobDescription, selfDescription } = req.body;

  if (!jobDescription) {
    return res.status(400).json({
      message: "Job Description is Required",
    });
  }

  if ((!req.file || req.file.size === 0) && !selfDescription?.trim()) {
    return res.status(400).json({
      message: "Please upload a resume or provide a self description",
    });
  }

  try {
    let content = "";

    // Only parse PDF if a file was uploaded
    if (req.file && req.file.size > 0) {
      const { PDFParse } = await import("pdf-parse");
      const pdfParser = new PDFParse({ data: req.file.buffer });
      await pdfParser.load();
      const result = await pdfParser.getText();
      content = result.text;
    }

    const interviewReportGenerateByAi = await interviewReport({
      resume: content,
      jobDescription,
      selfDescription: selfDescription || "",
    });

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const save = await Interview.create({
      user: req.user.id,
      resume: content,
      selfDescription: selfDescription || "",
      jobDescription,
      ...interviewReportGenerateByAi,
    });

    console.log(save);
    res.status(200).json({
      message: "Report generated successfully",
      save,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", errorMessage: error.message || error });
  }
}

async function GetMyReportsController(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const reports = await Interview.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Reports fetched successfully",
      reports,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", errorMessage: error.message || error });
  }
}

export { InterviewAiReportController, GetMyReportsController };
