const express = require('express');
const groupRouter = express.Router();
const {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup
} = require('../Controllers/group.controller');

// Route to create a new group
groupRouter.post('/', createGroup);

// Route to get all groups
groupRouter.get('/', getGroups);

// Route to get a single group by ID
groupRouter.get('/:id', getGroupById);

// Route to update a group by ID
groupRouter.put('/:id', updateGroup);

// Route to delete a group by ID
groupRouter.delete('/:id', deleteGroup);

module.exports = groupRouter;
