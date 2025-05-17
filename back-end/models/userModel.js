import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    cart: { type: Object, default: {} },
    businessScale: {type: String, default: ''}
  },
  { minimize: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
