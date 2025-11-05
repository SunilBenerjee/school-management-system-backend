import State from "../model/stateModel.js";

export const allStates = async (req, res) => {
  const states = await State.find();
  res.json(states);
};
