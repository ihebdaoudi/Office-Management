const Software = require("../Models/softwere.model");

module.exports = {
  // Create a new software entry
  createSoftware: async (req, res) => {
    try {
      const software = new Software(req.body);
      await software.save();
      res.status(201).json(software);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all software entries
  getSoftware: async (req, res) => {
    try {
      const softwareList = await Software.find()
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("groups");
      res.status(200).json(softwareList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single software entry by ID
  getSoftwareById: async (req, res) => {
    try {
      const software = await Software.findById(req.params.id)
        .populate("user")
        .populate("groups");
      if (!software) {
        return res.status(404).json({ message: "Software not found" });
      }
      res.status(200).json(software);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Update a software entry by ID
  updateSoftware: async (req, res) => {
    try {
      const software = await Software.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("user")
        .populate("groups");

      if (!software) {
        return res.status(404).json({ message: "Software not found" });
      }

      res.status(200).json(software);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // Delete a software entry by ID
  deleteSoftware: async (req, res) => {
    try {
      const software = await Software.findByIdAndDelete(req.params.id);
      if (!software) {
        return res.status(404).json({ message: "Software not found" });
      }
      res.status(200).json({ message: "Software deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addUser: async (req, res) => {
    try {
      const software = await Software.findById(req.params.id);
      if (!software) {
        return res.status(404).json({ message: "Software not found" });
      }
      software.user.push(req.body.user);
      await software.save();
      res.status(200).json(software);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  removeUser: async (req, res) => {
    try {
      // Find the software document by ID
      const software = await Software.findById(req.params.id);

      if (!software) {
        return res.status(404).json({ message: "Software not found" });
      }

      // Check if the user exists in the user array
      const userIndex = software.user.indexOf(req.body.user);
      if (userIndex !== -1) {
        // Remove the user from the array
        software.user.splice(userIndex, 1);

        // Save the updated software document
        await software.save();
        res.status(200).json(software);
      } else {
        res.status(404).json({ message: "User not found in the software" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
