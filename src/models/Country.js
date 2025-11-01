import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  iso2: { type: String },
  iso3: { type: String },
});

export default mongoose.models.Country ||
  mongoose.model("Country", countrySchema);
