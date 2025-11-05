import express from "express";
import { allCountries } from "../controller/countryController.js";
import { allStates } from "../controller/stateController.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/countries", allCountries);

router.get("/states", allStates);

router.put("/restore/:collection/:id", async (req, res) => {
    try {
        const { collection, id } = req.params;
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid ID" });
        const db = mongoose.connection.db, _id = new mongoose.Types.ObjectId(id);
        if (!(await db.listCollections().toArray()).some(c => c.name === collection)) return res.status(404).json({ success: false, message: "Collection not found" });
        const coll = db.collection(collection), doc = await coll.findOne({ _id });
        if (!doc?.deletedAt) return res.status(404).json({ success: false, message: "Not found or already active" });
        await coll.updateOne({ _id }, { $set: { deletedAt: null } });
        res.json({ success: true, message: `${collection} restored successfully` });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

export default router;
