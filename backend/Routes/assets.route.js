const express = require("express");
const assetRouter = express.Router();
const {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  search,
} = require("../Controllers/assets.controller");

// Route to create a new asset
assetRouter.post("/", createAsset);
assetRouter.post("/search", search);

// Route to get all assets
assetRouter.get("/", getAssets);

// Route to get a single asset by ID
assetRouter.get("/:id", getAssetById);

// Route to update an asset by ID
assetRouter.put("/:id", updateAsset);

// Route to delete an asset by ID
assetRouter.delete("/:id", deleteAsset);

module.exports = assetRouter;
