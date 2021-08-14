const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api_v1');

const app = express();
const path = require('path');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
); // applied to all requests

app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//versioning of api
app.use('/v1', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
