const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categorie: { type: String },
  model: { type: String },
  brand: { type: String },
  serialNumber: { type: String },
  description: { type: String },
  purchaseDate: { type: Date },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" }, // Assuming Location is a separate model
},
{ timestamps: true });

const Asset = mongoose.model("assets", assetSchema);
module.exports = Asset;
