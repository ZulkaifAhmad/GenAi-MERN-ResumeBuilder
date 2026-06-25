import "dotenv/config";
import { app } from "./src/app.js";
import dbConnect from "./src/config/db.js";

const { PORT, MONGODB_URI } = process.env;

dbConnect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
