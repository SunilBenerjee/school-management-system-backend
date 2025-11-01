import express from "express";
import User from "../models/UserModal.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // for unique_id generation

const router = express.Router();

router.post("/admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ user_type: "SUPER_ADMIN" });
    if (existingAdmin) {
      return res.status(400).json({ message: "SUPER_ADMIN already exists" });
    }

    const superAdmin = new User({
      name: "Super Admin",
      email: "superadmin@example.com",
      username: "superadmin",
      password: "superadmin",
      contact: "9999999999",
      user_type: "SUPER_ADMIN",
      profile_image: "",
      status: "ACTIVE",
      unique_id: uuidv4(), // auto-generate unique ID
    });

    await superAdmin.save();

    res.status(201).json({
      message: "SUPER_ADMIN user created successfully",
      user: {
        id: superAdmin._id,
        name: superAdmin.name,
        email: superAdmin.email,
        username: superAdmin.username,
        user_type: superAdmin.user_type,
        status: superAdmin.status,
      },
    });
  } catch (err) {
    console.error("Error creating SUPER_ADMIN:", err);
    res.status(500).json({ error: "Failed to create SUPER_ADMIN" });
  }
});

export default router;
