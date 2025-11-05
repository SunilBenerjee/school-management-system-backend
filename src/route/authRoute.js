import express from "express";
import { login, self } from "../controller/authController.js";
import verifyToken from "../middleware/verifyTokenMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.get("/self", verifyToken, self);

export default router;
