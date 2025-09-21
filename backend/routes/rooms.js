// backend/routes/rooms.js

import express from "express";
import PG from "../models/PG.js";
import Room from "../models/Room.js";
import { auth, ownerOnly } from "../middleware/auth.js";

const router = express.Router();

// Create room under a PG (owner only, must be owner of that PG)
router.post("/", auth, ownerOnly, async (req, res) => {
  try {
    const { pgId, name, type, totalBeds, rentPerBed, images } = req.body;
    const pg = await PG.findById(pgId);
    if (!pg) return res.status(404).json({ message: "PG not found" });
    if (pg.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not owner of this PG" });

    const room = await Room.create({
      pg: pgId,
      name,
      type,
      totalBeds: totalBeds || 1,
      occupiedBeds: 0,
      rentPerBed: rentPerBed || 0,
      images: images || []
    });
    res.status(201).json({ room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List rooms (optional query: ?pg=<pgId>)
router.get("/", auth, async (req, res) => {
  try {
    const { pg } = req.query;
    const filter = {};
    if (pg) filter.pg = pg;
    const rooms = await Room.find(filter);
    res.json({ rooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get room by id
router.get("/:id", auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update room (owner only and owner of PG)
router.put("/:id", auth, ownerOnly, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("pg");
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.pg.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not owner" });
    Object.assign(room, req.body);
    await room.save();
    res.json({ room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete room (owner only and owner of PG)
router.delete("/:id", auth, ownerOnly, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("pg");
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.pg.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not owner" });
    await room.deleteOne()
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
