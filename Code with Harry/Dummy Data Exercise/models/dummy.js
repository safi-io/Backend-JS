import mongoose from "mongoose";

const dummySchema = new mongoose.Schema({
  name: String,
  model: Number,
  isBlack: Boolean,
});

export const dummy = mongoose.model('dummy', dummySchema);
