// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-passwordHash");
    if (!user) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export function ownerOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "No user" });
  if (req.user.role !== "owner") return res.status(403).json({ message: "Owners only" });
  next();
}

export default auth;
