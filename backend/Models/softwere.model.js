const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const softwareSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: String },
    publisher: { type: String },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], // Assuming User is already defined
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }], // Assuming Group is a separate model
  },
  { timestamps: true });
  
  const Software = mongoose.model('software', softwareSchema);

  module.exports = Software;