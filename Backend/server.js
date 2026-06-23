import "dotenv/config";
import { app } from "./src/app.js";
import dbConnect from "./src/config/db.js";
import interviewReport from "./src/services/ai.services.js";
import {
  resume,
  jobDescription,
  selfDescription,
} from "./src/services/testData.js";

const { PORT, MONGODB_URI } = process.env;

dbConnect(MONGODB_URI);
interviewReport({ resume, selfDescription, jobDescription });

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
