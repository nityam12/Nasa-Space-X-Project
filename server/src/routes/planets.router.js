const express = require('express');

const planetsRouter = express.Router();

const {
  httpGetallPlanets,
} = require('../controller/planets.controller');

planetsRouter.get('/', httpGetallPlanets);

module.exports = planetsRouter;
