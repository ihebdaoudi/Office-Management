const Group = require('../Models/group.model');

module.exports = {
  // Create a new group
  createGroup: async (req, res) => {
    try {
      const group = new Group(req.body);
      await group.save();
      res.status(201).json(group);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all groups
  getGroups: async (req, res) => {
    try {
      const groups = await Group.find().populate('members');
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single group by ID
  getGroupById: async (req, res) => {
    try {
      const group = await Group.findById(req.params.id).populate('members');
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a group by ID
  updateGroup: async (req, res) => {
    try {
      const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate('members');

      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      res.status(200).json(group);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a group by ID
  deleteGroup: async (req, res) => {
    try {
      const group = await Group.findByIdAndDelete(req.params.id);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
