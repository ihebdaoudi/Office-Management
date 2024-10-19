const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = new mongoose.Schema({
    country: { type: String },
    zipcode: { type: String },
    name: { type: String },
    fullAddress: { type: String },
  },
  { timestamps: true });
  
  const Location = mongoose.model('locations', locationSchema);
  module.exports = Location;