
//PG-PORTAL/backend/models/Room.js
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  pg: { type: mongoose.Schema.Types.ObjectId, ref: "PG", required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["1-seater","2-seater","3-seater"], default: "1-seater" },
  totalBeds: { type: Number, default: 1 },
  occupiedBeds: { type: Number, default: 0 },
  rentPerBed: { type: Number, default: 0 },
  status: { type: String, enum: ["vacant","partial","full"], default: "vacant" },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
