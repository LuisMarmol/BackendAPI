const express = require('express');

const placesRoutes = require('./routes/places-routes');

const app = express();
const port = 3000;

app.use('/api/places', placesRoutes);

app.listen(port);