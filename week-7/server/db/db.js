//  start writing from here
const mongoose = require("mongoose");

const connectDb = async () => {
  try {

    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MONGODB connected || DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

module.exports= connectDb;
