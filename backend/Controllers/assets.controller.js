const Asset = require("../Models/assets.model");
const { search } = require("../Routes/user.route");
module.exports = {
  // Create a new asset
  createAsset: async (req, res) => {
    try {
      const asset = new Asset(req.body);
      await asset.save();
      res.status(201).json(asset);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all assets
  getAssets: async (req, res) => {
    try {
      const assets = await Asset.find()
        .sort({ createdAt: -1 })
        .populate("location");
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  search: async (req, res) => {
    try {
      const query = req.body.query || ""; // Ensure query is always a string
      // Define the search criteria to look for matches in all string fields
      const searchCriteria = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { categorie: { $regex: query, $options: "i" } },
          { model: { $regex: query, $options: "i" } },
          { brand: { $regex: query, $options: "i" } },
          { serialNumber: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      };

      const assets = await Asset.find(searchCriteria).populate("location");
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single asset by ID
  getAssetById: async (req, res) => {
    try {
      const asset = await Asset.findById(req.params.id).populate("location");
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json(asset);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an asset by ID
  updateAsset: async (req, res) => {
    try {
      const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate("location");

      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }

      res.status(200).json(asset);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an asset by ID
  deleteAsset: async (req, res) => {
    try {
      const asset = await Asset.findByIdAndDelete(req.params.id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.status(200).json({ message: "Asset deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
