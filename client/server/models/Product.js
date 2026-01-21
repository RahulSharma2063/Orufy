import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    mrp: { type: Number },
    price: { type: Number, required: true },
    brand: String,
    exchange: { type: String, enum: ["Yes", "No"], default: "Yes" },
    images: [String],
    status: { type: String, enum: ["published", "unpublished"], default: "unpublished" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
