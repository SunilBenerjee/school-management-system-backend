import express from "express";
import adminController from "../controller/adminController.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { adminValidator } from "../validator/adminValidator.js";

const router = express.Router();

router.post("/admin", adminValidator.createAdminValidation, validateRequest, adminController.create);
router.get("/admin", adminController.get);
router.get("/admin/:id", adminValidator.idValidation, validateRequest, adminController.detail);
router.put("/admin/:id", adminValidator.updateAdminValidation, validateRequest, adminController.update);
router.put("/admin-password/:id", adminValidator.updateAdminPasswordValidation, validateRequest, adminController.updatePassword);
router.delete("/admin/:id", adminValidator.idValidation, adminController.delete);

export default router;
