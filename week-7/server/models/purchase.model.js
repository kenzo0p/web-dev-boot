const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model("Purchases", purchaseSchema);

module.exports = { purchaseModel };
