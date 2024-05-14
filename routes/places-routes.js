const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/', placesControllers.getAllPlaces);

router.get('/:pid', placesControllers.getPlacesById);

router.get('/users/:uid', placesControllers.getPlacesByUser);

router.post('/', placesControllers.postPlaces);

module.exports = router;