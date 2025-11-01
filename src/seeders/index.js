import dotenv from "dotenv";
import connectDB from "../config/db.js";
import userSeeder from "./userSeeder.js";
import countryStateSeeder from "./countryStateSeeder.js";

dotenv.config();

const seedAll = async () => {
  try {
    await connectDB();
    await userSeeder();
    await countryStateSeeder();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
};

seedAll();
