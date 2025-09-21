// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["owner","tenant"], default: "tenant" },
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

// Prevent recompiling model
export default mongoose.models.User || mongoose.model("User", UserSchema);
