import express from "express";
import { allCountries } from "../controllers/countryController.js";
import { allStates } from "../controllers/stateController.js";

const router = express.Router();

router.get("/countries", allCountries);

router.get("/states", allStates);

export default router;
