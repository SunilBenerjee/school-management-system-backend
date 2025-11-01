import Country from "../models/Country.js";

export const allCountries = async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
};
