import mongoose, { Document } from "mongoose";

export interface ItemInterface extends Document {
  title: string;
  description: string;
  price: number;
  to_trade: boolean;
  owner: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

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
    required: true,
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

const Item = mongoose.model<ItemInterface>("Item", itemSchema);

export default Item;
