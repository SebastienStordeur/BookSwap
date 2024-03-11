import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  to_trade: {
    type: Boolean,
    default: true,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
