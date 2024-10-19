const Tickets = require("../Models/tickets.model");

module.exports = {
  // Create a new ticket
  createTicket: async (req, res) => {
    try {
      const ticket = new Tickets(req.body);
      await ticket.save();
      res.status(201).json(ticket);
    } catch (error) {   
      res.status(400).json({ message: error.message });
    }
  },

  // Get all tickets
  getTickets: async (req, res) => {
    try {
      const tickets = await Tickets.find()
        .sort({ createdAt: -1 })
        .populate("sender");
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single ticket by ID
  getTicketById: async (req, res) => {
    try {
      const ticket = await Tickets.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  resolveTicket: async (req, res) => {
    try {
      const ticket = await Tickets.findByIdAndUpdate(req.params.id, {
        solution: req.body.solution,
        isResolved: true,
      });
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  openedTikcet: async (req, res) => {
    try {
      const ticket = await Tickets.findByIdAndUpdate(
        req.params.id,
        {
          isOpen: true,
        },
        { new: true, runValidators: true }
      );

      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  filterMyTickets: async (req, res) => {
    try {
      let { query, isResolved, isOpen,userId } = req.body;
      console.log({ query, isResolved, isOpen ,userId });

      let searchCriteria = {};
      if (!isOpen&&!isResolved) {
        searchCriteria = {
          $and: [
            {
              $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
              ],
            },
            { sender: userId },
          ],
        };
      }
      if (isOpen) {
        searchCriteria = {
          $and: [
            {
              $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
              ],
            },
            { isOpen: isOpen },
            { isResolved: false },
            { sender: userId },
          ],
        };
      }
      if (isResolved) {
        searchCriteria = {
          $and: [
            {
              $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
              ],
            },
            { isResolved: isResolved },
            { sender: userId },
          ],
        };
      }
      const tickets = await Tickets.find(searchCriteria)
        .sort({ createdAt: -1 })
        .populate("sender");
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  filterTickets: async (req, res) => {
    try {
      let { query, isResolved, isOpen } = req.body;
      console.log({ query, isResolved, isOpen });

      let searchCriteria = {};
      if (!isOpen&&!isResolved) {
        searchCriteria = {
          $and: [
            {
              $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
              ],
            },
          ],
        };
      }
      if (isOpen) {
        searchCriteria = {
          $and: [
            {
              $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
              ],
            },
            { isOpen: isOpen },
            { isResolved: false },
          ],
        };
      }
      if (isResolved) {
        searchCriteria = {
          $and: [
            {
              $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
              ],
            },
            { isResolved: isResolved },
          ],
        };
      }
      const tickets = await Tickets.find(searchCriteria)
        .sort({ createdAt: -1 })
        .populate("sender");
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Update a ticket by ID
  updateTicket: async (req, res) => {
    try {
      const ticket = await Tickets.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a ticket by ID
  deleteTicket: async (req, res) => {
    try {
      const ticket = await Tickets.findByIdAndDelete(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
