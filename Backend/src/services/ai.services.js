import { GoogleGenAI } from "@google/genai";
import { z } from "zod";


export const interviewReportSchema = z.object({
  skillGaps: z.array(
    z.object({
      skills: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behaviouralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.string(),
    }),
  ),

  matchScore: z.number().min(0).max(100),
});

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI });

async function interviewReport({ resume, jobDescription, selfDescription }) {
  const prompt = `
You are an expert interview coach.

Analyze the candidate and return ONLY valid JSON.

STRICT RULES:
- Do NOT add explanation
- Do NOT add markdown
- Do NOT add backticks
- Output must be valid JSON
- Follow schema exactly

Schema:
{
  "skillGaps": [{ "skills": "string", "severity": "low|medium|high" }],
  "technicalQuestions": [{ "question": "string", "intention": "string", "answer": "string" }],
  "behaviouralQuestions": [{ "question": "string", "intention": "string", "answer": "string" }],
  "preparationPlan": [{ "day": number, "focus": "string", "tasks": "string" }],
  "matchScore": number
}

Rules:
- skillGaps: at least 5
- technicalQuestions: exactly 5
- behaviouralQuestions: exactly 3
- preparationPlan: exactly 7 days
- matchScore: 0–100 integer
- No null values

Resume: ${resume}
Job Description: ${jobDescription}
Self Description: ${selfDescription}
`;

  const MAX_RETRIES = 5;
  const BASE_DELAY_MS = 10000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${MAX_RETRIES}...`);

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const rawJson = response.text
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/gi, "")
        .trim();

      const parsed = JSON.parse(rawJson);

      parsed.skillGaps = parsed.skillGaps?.filter(Boolean) ?? [];
      parsed.technicalQuestions =
        parsed.technicalQuestions?.filter(Boolean) ?? [];
      parsed.behaviouralQuestions =
        parsed.behaviouralQuestions?.filter(Boolean) ?? [];
      parsed.preparationPlan = parsed.preparationPlan?.filter(Boolean) ?? [];

      const report = interviewReportSchema.parse(parsed);
      console.log(report);
      console.log("Report generated successfully!");
      return report;
    } catch (error) {
      const isRetryable = error.status === 429 || error.status === 503;

      if (isRetryable && attempt < MAX_RETRIES) {
        const wait = BASE_DELAY_MS * attempt;
        console.log(`Error ${error.status}. Retrying in ${wait / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, wait));
      } else {
        console.error(`Failed after ${attempt} attempt(s):`, error.message);
        throw error;
      }
    }
  }
}

export default interviewReport;
