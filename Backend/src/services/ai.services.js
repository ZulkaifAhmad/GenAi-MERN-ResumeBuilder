import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

// ─── 1. SCHEMA ────────────────────────────────────────────────────────────────
// Zod schema defines the exact shape of the JSON we expect from Gemini.
// If the response doesn't match this shape, Zod throws an error.

export const interviewReportSchema = z.object({
  // Array of weak/missing skills
  skillGaps: z.array(
    z.object({
      skills: z.string(), // e.g. "Docker"
      severity: z.enum(["low", "medium", "high"]), // how serious
    }),
  ),

  // Technical questions with why they're asked + ideal answers
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(), // why the interviewer asks this
      answer: z.string(), // what a good answer looks like
    }),
  ),

  // Behavioural questions (e.g. "Tell me about a time...")
  behaviouralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  // A day-by-day study plan to prepare for the interview
  preparationPlan: z.array(
    z.object({
      day: z.number(), // Day 1, Day 2, etc.
      focus: z.string(), // main topic for the day
      tasks: z.string(), // what to actually do
    }),
  ),

  // 0–100 score: how well does the resume match the job description?
  matchScore: z.number().min(0).max(100),
});

// ─── 2. GEMINI CLIENT ─────────────────────────────────────────────────────────
const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI });

// ─── 3. MAIN FUNCTION ─────────────────────────────────────────────────────────
async function interviewReport({ resume, jobDescription, selfDescription }) {
  // Build the prompt — we tell Gemini exactly what we want and the JSON format
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

  // Retry config — Gemini sometimes returns 429 (quota) or 503 (overload)
  const MAX_RETRIES = 5;
  const BASE_DELAY_MS = 10000; // 10 seconds, multiplied by attempt number

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${MAX_RETRIES}...`);

      // Call Gemini API
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json", // ask for JSON response
          temperature: 0.3, // lower = more consistent output
        },
      });

      // Clean the response (strip markdown fences if Gemini adds them anyway)
      const rawJson = response.text
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/gi, "")
        .trim();

      // Parse the JSON string into a JS object
      const parsed = JSON.parse(rawJson);

      // Remove any null items from arrays (safety net)
      parsed.skillGaps = parsed.skillGaps?.filter(Boolean) ?? [];
      parsed.technicalQuestions =
        parsed.technicalQuestions?.filter(Boolean) ?? [];
      parsed.behaviouralQuestions =
        parsed.behaviouralQuestions?.filter(Boolean) ?? [];
      parsed.preparationPlan = parsed.preparationPlan?.filter(Boolean) ?? [];

      // Validate the shape with Zod — throws if anything is missing or wrong type
      const report = interviewReportSchema.parse(parsed);
      console.log(report);
      console.log("Report generated successfully!");
      return report;
    } catch (error) {
      const isRetryable = error.status === 429 || error.status === 503;

      if (isRetryable && attempt < MAX_RETRIES) {
        // Wait longer each retry: 10s, 20s, 30s...
        const wait = BASE_DELAY_MS * attempt;
        console.log(`Error ${error.status}. Retrying in ${wait / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, wait));
      } else {
        // Non-retryable error or ran out of attempts — throw to caller
        console.error(`Failed after ${attempt} attempt(s):`, error.message);
        throw error;
      }
    }
  }
}

export default interviewReport;
