import Country from "../model/countryModel.js";

export const allCountries = async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
};
