import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const uri =
      process.env.NEXT_PUBLIC_MONGODB_URI ||
      "mongodb://localhost:27017/HomeCook";

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(uri);

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};
