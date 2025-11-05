import User from '../model/userModel.js';
import { v4 as uuid } from "uuid";

const adminController = {
  async create(req, res) {
    try {
      const { name, email, contact, username, password } = req.body;
      const { role, profile_image, last_login, status, deletedAt } = { role: "ADMIN", profile_image: "", last_login: "", status: "ACTIVE", deletedAt: "" };
      const user = await User.create({ name, email, contact, username, password, role, profile_image, last_login, status, deletedAt });
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async get(req, res) {
    try {
      const page = +req.query.page || +req.body.page;
      const perPage = +req.query.perPage || +req.body.perPage;
      const query = { role: "ADMIN" };
      const skip = (page - 1) * perPage;
      const users = page && perPage
        ? await User.find(query).skip(skip).limit(perPage).sort({ createdAt: -1 })
        : await User.find(query).sort({ createdAt: -1 });
      if (page && perPage) {
        const total = await User.countDocuments(query);
        return res.status(200).json({
          success: true,
          data: users,
          pagination: { total, page, perPage, totalPages: Math.ceil(total / perPage) },
        });
      }
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async detail(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res.status(404).json({ success: false, message: 'User not found' });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, contact, username } = req.body;
      const user = await User.findByIdAndUpdate(id, { name, email, contact, username }, { new: true });
      if (!user)
        return res.status(404).json({ success: false, message: 'User not found' });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const user = await User.findByIdAndUpdate(id, { password }, { new: true });
      if (!user)
        return res.status(404).json({ success: false, message: 'User not found' });
      res.status(200).json({ success: true, message: "Password updated successfully." });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res.status(404).json({ success: false, message: "User not found" });
      user.deletedAt = new Date();
      await user.save();
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

export default adminController;
