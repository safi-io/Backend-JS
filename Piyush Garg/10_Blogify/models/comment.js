const mongoose = require("mongoose");

// Schema of Comment
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

// Model
const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
