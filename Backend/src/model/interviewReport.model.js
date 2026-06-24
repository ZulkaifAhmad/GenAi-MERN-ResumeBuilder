import mongoose from "mongoose";

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "self desciption is required"],
    },

    resume: String,

    selfDescription: String,

    skillGaps: [
      {
        skills: String,
        severity: {
          type: String,
          enum: ["low", "medium", "high"],
          required: [true, "severity is required"],
        },
      },
    ],

    technicalQuestions: [
      {
        question: String,
        intention: String,
        answer: String,
        required: true,
      },
    ],

    behaviourialQuestions: [
      {
        question: String,
        intention: String,
        answer: String,
        required: true,
      },
    ],

    preparationPlan: [
      {
        day: Number,
        focus: String,
        tasks: String,
        required: true,
      },
    ],
    matchScore: [
      {
        type: Number,
        min: 0,
        max: 100,
      },
    ],
  },
  { timestamps: true },
);

const Interview = mongoose.model("interview", interviewReportSchema);

export default Interview ;