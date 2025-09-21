// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import tenantsRouter from './routes/tenants.js';
import cors from 'cors';

// Import routes
import authRouter from "./routes/auth.js";
import pgsRouter from "./routes/pgs.js";
import roomsRouter from "./routes/rooms.js";
import bookingsRouter from "./routes/bookings.js"; // bookings route

dotenv.config();

const app = express(); // <-- initialize app first

// Middleware
app.use(express.json()); // parse JSON body

// Routes
app.use("/api/auth", authRouter);
app.use("/api/pgs", pgsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingsRouter); // bookings route
app.use('/api/tenants', tenantsRouter);
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Connect to MongoDB
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connect error:", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
