const mongoose = require("mongoose");

// Connect to MongoDB
export const conectionInstance = async () => {
  try {
    await mongoose
      .connect("your-mongodb-url")
      .then(() => console.log("Mongodb connection successfull"))
      .catch(() => console.log("Mongodb connection failed"));
  } catch (error) {
    console.log(error, "Mongodb Connection failed");
  }
};

// Define schemas

const UserSchema = new mongoose.Schema(
  {
    // Schema definition here
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const TodoSchema = new mongoose.Schema(
  {
    // Schema definition here
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // automatically remove after 10 minutes (matches token expiry)
  },
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

const TokenBlacklist = mongoose.model("TokenBlacklist", TokenBlacklistSchema);

module.exports = {
  User,
  Todo,
  TokenBlacklist,
};
