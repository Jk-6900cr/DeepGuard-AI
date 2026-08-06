const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    filepath: {
      type: String,
      required: true,
    },

    prediction: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    risk: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prediction", predictionSchema);