// backend/routes/tenants.js
import express from 'express';
import bcrypt from 'bcryptjs'; 
import User from '../models/User.js';
import { auth, ownerOnly } from '../middleware/auth.js'; // optional ownerOnly for owner actions

const router = express.Router();

// List tenants (owner only or admin)
router.get('/', auth, ownerOnly, async (req, res) => {
  try {
    const tenants = await User.find({ role: 'tenant' }).select('-passwordHash');
    res.json(tenants);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Create tenant (owner only)
router.post('/', auth, ownerOnly, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email exists' });
    // create user with role tenant; hash password same as auth route

    const salt = await bcrypt.genSalt(10);
    const passwordHash = password ? await bcrypt.hash(password, salt) : await bcrypt.hash('defaultPass123', salt);
    const user = await User.create({ name, email, phone, passwordHash, role: 'tenant' });
    res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Update tenant (owner only)
router.put('/:id', auth, ownerOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
      const bcrypt = await import('bcryptjs');
      const salt = await bcrypt.default.genSalt(10);
      updates.passwordHash = await bcrypt.default.hash(updates.password, salt);
      delete updates.password;
    }
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Tenant not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete tenant (owner only)
router.delete('/:id', auth, ownerOnly, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;
