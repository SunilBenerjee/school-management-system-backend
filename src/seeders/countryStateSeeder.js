import axios from "axios";
import Country from "../models/Country.js";
import State from "../models/State.js";

const seedCountriesAndStates = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/states"
    );
    const countriesData = response.data.data;
    await Country.deleteMany();
    await State.deleteMany();
    for (const country of countriesData) {
      const newCountry = await Country.create({
        name: country.name,
        iso2: country.iso2,
        iso3: country.iso3,
      });
      if (country.states?.length) {
        const stateDocs = country.states.map((s) => ({
          name: s.name,
          country_id: newCountry._id,
        }));
        await State.insertMany(stateDocs);
      }
    }
  } catch (err) {
    throw err;
  }
};

export default seedCountriesAndStates;
