const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    imgaeUrl: String,
    creatorId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Courses", courseSchema);

module.exports = { courseModel };
