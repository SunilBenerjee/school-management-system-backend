import State from "../models/State.js";

export const allStates = async (req, res) => {
  const states = await State.find();
  res.json(states);
};
