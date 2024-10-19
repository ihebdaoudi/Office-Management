const Location = require('../Models/location.model');

module.exports = {
  // Create a new location
  createLocation: async (req, res) => {
    try {
      const location = new Location(req.body);
      await location.save();
      res.status(201).json(location);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all locations
  getLocations: async (req, res) => {
    try {
      const locations = await Location.find();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single location by ID
  getLocationById: async (req, res) => {
    try {
      const location = await Location.findById(req.params.id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a location by ID
  updateLocation: async (req, res) => {
    try {
      const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }

      res.status(200).json(location);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a location by ID
  deleteLocation: async (req, res) => {
    try {
      const location = await Location.findByIdAndDelete(req.params.id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
