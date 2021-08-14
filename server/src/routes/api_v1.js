const express = require('express');
const path = require('path');
const planetsRouter = require('./planets.router');
const launchesRouter = require('./launches.router');
const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

module.exports = api;
