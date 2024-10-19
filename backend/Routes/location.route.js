const express = require('express');
const locationRouter = express.Router();
const {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} = require('../Controllers/location.controller');

// Route to create a new location
locationRouter.post('/', createLocation);

// Route to get all locations
locationRouter.get('/', getLocations);

// Route to get a single location by ID
locationRouter.get('/:id', getLocationById);

// Route to update a location by ID
locationRouter.put('/:id', updateLocation);

// Route to delete a location by ID
locationRouter.delete('/:id', deleteLocation);

module.exports = locationRouter;
