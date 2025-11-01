import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModal.js";
import Token from "../models/TokenModal.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// ✅ Verify token and return user info
router.get("/verify-token", verifyToken);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    await Token.deleteMany({ user_id: user._id });
    await Token.create({
      user_id: user._id,
      token,
    });
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
