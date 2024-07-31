import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  name: String,
  model: Number,
  isBlack: Boolean,
});

export const mobile = mongoose.model('mobile', mobileSchema);
