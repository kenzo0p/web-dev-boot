//  start writing from here
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MONGODB connected || DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connectDb;
