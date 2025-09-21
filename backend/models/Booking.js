//PG-PORTAL/backend/models/Booking.js

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  rentPerBed: { type: Number, required: true },
  rentDueDate: { type: Date, required: true },
  paid: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
