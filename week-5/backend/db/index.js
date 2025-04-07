//  start writing from here
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `\n MONGODB connected || DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connectDb;
