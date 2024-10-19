const express = require('express');
const softwareRouter = express.Router();
const {
  createSoftware,
  getSoftware,
  getSoftwareById,
  updateSoftware,
  deleteSoftware,
  addUser,
  removeUser,
} = require('../Controllers/softwere.controller');

// Route to create a new software entry
softwareRouter.post('/', createSoftware);

softwareRouter.put('/:id/addUser', addUser);
softwareRouter.put('/:id/removeUser', removeUser);

// Route to get all software entries
softwareRouter.get('/', getSoftware);

// Route to get a single software entry by ID
softwareRouter.get('/:id', getSoftwareById);

// Route to update a software entry by ID
softwareRouter.put('/:id', updateSoftware);

// Route to delete a software entry by ID
softwareRouter.delete('/:id', deleteSoftware);

module.exports = softwareRouter;