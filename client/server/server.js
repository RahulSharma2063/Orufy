import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  quantity: Number,
  mrp: Number,
  price: Number,
  brand: String,
  exchange: String,
  images: [String],
  status: { type: String, default: "unpublished" }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
