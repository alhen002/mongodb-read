import mongoose from "mongoose";
const { Schema } = mongoose;
import Review from "./Review";
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  currency: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
