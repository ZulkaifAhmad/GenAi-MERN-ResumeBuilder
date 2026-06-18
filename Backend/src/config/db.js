import mongoose from "mongoose";

const dbConnect = async (uri) => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("mongodb Already Connected");
      return;
    }
    await mongoose.connect(uri);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Connection failed:", error);
  }
};

export default dbConnect;
