import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"; // npm install zod-to-json-schema

export const interviewReportSchema = z.object({
  skillGaps: z
    .array(
      z.object({
        skills: z
          .string()
          .describe("Name of the missing or weak skill in the candidate"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("How serious the skill gap is"),
      }),
    )
    .describe("List of skills where candidate is weak or missing knowledge"),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Technical interview question based on job role"),
        intention: z
          .string()
          .describe("Why this question is being asked in interview"),
        answer: z.string().describe("Expected or ideal answer to the question"),
      }),
    )
    .describe("Technical interview questions with answers and purpose"),

  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("Behavioural or situational interview question"),
        intention: z.string().describe("Purpose of this behavioural question"),
        answer: z
          .string()
          .describe("Ideal response for the behavioural question"),
      }),
    )
    .describe("Behavioural interview questions and expected answers"),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("Day number in preparation plan (e.g. Day 1, Day 2)"),
        focus: z
          .string()
          .describe("Main topic or skill to focus on for that day"),
        tasks: z
          .string()
          .describe("Specific tasks or practice activities for that day"),
      }),
    )
    .describe("Step-by-step preparation plan for interview readiness"),

  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Overall match score between resume and job description (0–100)"),
});

const client = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI,
});

// async function interviewReport({ resume, jobDescription, selfDescription }) {
//   const prompt = `Generate the Interview Report for the candidate with the following details 
//     resume: ${resume}, job-description: ${jobDescription}, self-description: ${selfDescription}
//   `;

//   const response = await client.models.generateContent({
//     model: "gemini-2.5-flash", // try this
//     contents: prompt,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: zodToJsonSchema(interviewReportSchema),
//     },
//   });

//   const rawJson = response.text;
//   const report = interviewReportSchema.parse(JSON.parse(rawJson));
//   console.log(report);

//   return report;
// }

async function interviewReport({ resume, jobDescription, selfDescription }) {
  const prompt = `You are an expert interview coach. Analyze the candidate's resume against the job description and generate a detailed interview report.

Resume:
${resume}

Job Description:
${jobDescription}

Self Description:
${selfDescription}

Return ONLY a valid JSON object with exactly this structure (no markdown, no backticks, no explanation):
{
  "skillGaps": [
    { "skills": "skill name", "severity": "low" | "medium" | "high" }
  ],
  "technicalQuestions": [
    { "question": "question text", "intention": "why this is asked", "answer": "ideal answer" }
  ],
  "behaviouralQuestions": [
    { "question": "question text", "intention": "why this is asked", "answer": "ideal answer" }
  ],
  "preparationPlan": [
    { "day": 1, "focus": "topic to focus on", "tasks": "specific tasks to do" }
  ],
  "matchScore": 70
}

Rules:
- skillGaps: list at least 5 real skill gaps based on the job requirements
- technicalQuestions: provide exactly 5 technical questions
- behaviouralQuestions: provide exactly 3 behavioural questions  
- preparationPlan: provide a 7-day plan
- matchScore: integer from 0 to 100
- Every array item must be a complete object, never null
`;

  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 10000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${MAX_RETRIES}...`);

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json", // keep this, drop responseSchema
          temperature: 0.3,
        },
      });

      let rawJson = response.text;

      // strip markdown fences just in case
      rawJson = rawJson.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();

      const parsed = JSON.parse(rawJson);

      // filter out any null items from arrays defensively
      if (parsed.skillGaps) parsed.skillGaps = parsed.skillGaps.filter(Boolean);
      if (parsed.technicalQuestions) parsed.technicalQuestions = parsed.technicalQuestions.filter(Boolean);
      if (parsed.behaviouralQuestions) parsed.behaviouralQuestions = parsed.behaviouralQuestions.filter(Boolean);
      if (parsed.preparationPlan) parsed.preparationPlan = parsed.preparationPlan.filter(Boolean);

      const report = interviewReportSchema.parse(parsed);
      console.log("Report generated successfully!");
      console.log(report)
      return report;

    } catch (error) {
      const isRetryable = error.status === 429 || error.status === 503;

      if (isRetryable && attempt < MAX_RETRIES) {
        const waitTime = RETRY_DELAY_MS * attempt;
        console.log(`Error ${error.status}. Retrying in ${waitTime / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        console.error(`Failed after ${attempt} attempts.`);
        throw error;
      }
    }
  }
}

export default interviewReport;
