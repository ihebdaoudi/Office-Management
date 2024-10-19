const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    filePath: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true });
  
const Document = mongoose.model('documents', documentSchema);
module.exports = Document;