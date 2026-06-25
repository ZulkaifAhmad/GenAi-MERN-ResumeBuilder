import mongoose from "mongoose";

const interviewReportSchema = new mongoose.Schema(
  {
    user : {
      type : mongoose.Schema.Types.ObjectId ,
      ref : "users"
    } ,
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },

    resume: {
      type: String,
    },

    selfDescription: {
      type: String,
    },

    skillGaps: [
      {
        _id : false ,
        skills: {
          type: String,
        },
        severity: {
          type: String,
          enum: ["low", "medium", "high"],
          required: [true, "severity is required"],
        },
      },
    ],

    technicalQuestions: [
      {
        _id : false ,
        question: {
          type: String,
          required: true,
        },
        intention: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],

    behaviouralQuestions: [
      {
        _id : false ,
        question: {
          type: String,
          required: true,
        },
        intention: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],

    preparationPlan: [
      {
        _id : false,
        day: {
          type: Number,
          required: true,
        },
        focus: {
          type: String,
        },
        tasks: {
          type: String,
        },
      },
    ],

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

const Interview = mongoose.model("interview", interviewReportSchema);

export default Interview;
