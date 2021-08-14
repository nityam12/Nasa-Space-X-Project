const { getAllPlanets } = require('../models/planets.model');

async function httpGetallPlanets(req, res) {
  const allPlanets = await getAllPlanets();
  return res.status(200).json(allPlanets);
}

module.exports = { httpGetallPlanets };
