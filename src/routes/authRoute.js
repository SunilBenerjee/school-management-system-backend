import express from "express";
import { login, self } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", login);

router.get("/self", verifyToken, self);

export default router;
