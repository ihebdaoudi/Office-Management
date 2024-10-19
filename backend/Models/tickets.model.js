const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    solution: { type: String},
    isOpen: {
        type: Boolean, default: false
    },
    isResolved: { type: Boolean, default: false },
},
    { timestamps: true });

const Tickets = mongoose.model('tickets', ticketsSchema);
module.exports = Tickets;