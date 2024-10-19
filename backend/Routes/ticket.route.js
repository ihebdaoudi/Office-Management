const express = require("express");
const ticketRouter = express.Router();
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  resolveTicket,
  openedTikcet,
  filterTickets,
  filterMyTickets
} = require("../Controllers/tickets.controller");

// Route to create a new ticket
ticketRouter.post("/", createTicket);

// Route to get all tickets
ticketRouter.post("/getAll", filterTickets);

ticketRouter.post("/getMyTickets", filterMyTickets);


// Route to get a single ticket by ID
ticketRouter.get("/:id", getTicketById);

// Route to update a ticket by ID
ticketRouter.put("/:id", updateTicket);

ticketRouter.put("/resolve/:id",resolveTicket);





ticketRouter.put("/open/:id", openedTikcet);
// ticketRouter.post("/open/:id", filterTickets);
// Route to delete a ticket by ID
ticketRouter.delete("/:id", deleteTicket);

module.exports = ticketRouter;
