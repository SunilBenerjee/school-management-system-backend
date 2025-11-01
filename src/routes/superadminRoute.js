import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json(req.user);
});

export default router;
