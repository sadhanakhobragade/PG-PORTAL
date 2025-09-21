// backend/routes/pgs.js

import express from "express";
import PG from "../models/PG.js";
import { auth, ownerOnly } from "../middleware/auth.js";

const router = express.Router();

// Create PG (owner only)
router.post("/", auth, ownerOnly, async (req, res) => {
  try {
    const { title, address, city, pincode, images, amenities } = req.body;
    const pg = await PG.create({
      owner: req.user._id,
      title,
      address,
      city,
      pincode,
      images: images || [],
      amenities: amenities || []
    });
    res.status(201).json({ pg });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// List PGs (owner: owner=me; tenant: all)
router.get("/", auth, async (req, res) => {
  try {
    const { owner } = req.query;
    let filter = {};
    if (owner === "me") filter.owner = req.user._id;
    const pgs = await PG.find(filter).populate("owner", "name email");
    res.json({ pgs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get PG by id
router.get("/:id", auth, async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id).populate("owner", "name email");
    if (!pg) return res.status(404).json({ message: "PG not found" });
    res.json({ pg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update PG (owner only & must own)
router.put("/:id", auth, ownerOnly, async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) return res.status(404).json({ message: "PG not found" });
    if (pg.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not owner" });
    Object.assign(pg, req.body);
    await pg.save();
    res.json({ pg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete PG (owner only & must own)
router.delete("/:id", auth, ownerOnly, async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) return res.status(404).json({ message: "PG not found" });
    if (pg.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not owner" });
    await pg.deleteOne();
    res.json({ message: "PG deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
