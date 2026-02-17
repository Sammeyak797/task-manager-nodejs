import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCEESSFULLY");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};
