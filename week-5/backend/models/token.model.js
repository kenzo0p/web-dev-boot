import mongoose from "mongoose";
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

export const TokenBlacklist = mongoose.model("TokenBlacklist", TokenBlacklistSchema);
