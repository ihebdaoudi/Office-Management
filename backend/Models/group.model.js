const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  }], //list of users 
},
  { timestamps: true });

const Group = mongoose.model("groups", groupSchema);
module.exports = Group;