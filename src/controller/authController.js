import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import Token from "../model/tokenModel.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });
    await Token.deleteMany({ user_id: user._id });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    await Token.create({ user_id: user._id, token });
    const { _id, name, email, contact, role } = user;
    res.json({
      message: "Login successful",
      data: { id: _id, name, email, username, contact, role, token },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const self = (req, res) => {
  return req.user
    ? res.status(200).json({ status: "success", data: req.user })
    : res.status(500).json({ message: "Internal server error." });
};
