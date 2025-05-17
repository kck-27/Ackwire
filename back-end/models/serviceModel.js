import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  companyScale: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Number, required: true },
  terms: { type: Array, required: true },
  features: { type: Array, required: true },
  more_info: { type: Array, required: true },
  mode: { type: Array, required: true },
  bestseller: { type: Boolean, required: true }
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
