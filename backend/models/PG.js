//PG-PORTAL/backend/models/PG.js

import mongoose from "mongoose";

const PGSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  address: String,
  city: String,
  pincode: String,
  images: [String],
  amenities: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.PG || mongoose.model("PG", PGSchema);
