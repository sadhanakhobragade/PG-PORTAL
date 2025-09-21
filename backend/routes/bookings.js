// backend/routes/bookings.js
import express from "express";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Tenant books a room
router.post("/", auth, async (req, res) => {
  try {
    const { roomId, rentDueDate } = req.body;

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check for overbooking
    if (room.occupiedBeds >= room.totalBeds) {
      return res.status(400).json({ message: "Room is full" });
    }

    // Create booking
    const booking = await Booking.create({
      tenant: req.user._id,
      roomId,
      rentPerBed: room.rentPerBed,
      rentDueDate,
    });

    // Update room occupancy
    room.occupiedBeds += 1;
    room.status = room.occupiedBeds === room.totalBeds
      ? "full"
      : room.occupiedBeds > 0
        ? "partial"
        : "vacant";
    await room.save();

    res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Tenant views their bookings
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ tenant: req.user._id }).populate("roomId");
    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Owner views bookings for their PGs
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "roomId",
        populate: { path: "pg" },
      })
      .populate("tenant");

    // Filter bookings only for PGs owned by this user
    const ownerBookings = bookings.filter(b => b.roomId.pg.owner.toString() === req.user._id.toString());
    res.status(200).json({ bookings: ownerBookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Owner views bookings for a specific PG
router.get("/pg/:pgId", auth, async (req, res) => {
  try {
    const { pgId } = req.params;

    const bookings = await Booking.find()
      .populate({
        path: "roomId",
        match: { pg: pgId },
      })
      .populate("tenant");

    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel booking (Tenant or Owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("roomId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only tenant who booked or owner of the PG can cancel
    if (req.user.role === "tenant" && booking.tenant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }
    if (req.user.role === "owner" && booking.roomId.pg.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Update room occupancy
    const room = await Room.findById(booking.roomId._id);
    room.occupiedBeds -= 1;
    room.status = room.occupiedBeds === room.totalBeds
      ? "full"
      : room.occupiedBeds > 0
        ? "partial"
        : "vacant";
    await room.save();

    await booking.remove();
    res.status(200).json({ message: "Booking cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
