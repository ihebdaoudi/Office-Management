const express = require("express");
const documentRouter = express.Router();
const { uploadFile } = require("../Middlewares/uploadPDF");

const {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  search
} = require("../Controllers/documents.controller");

// Route to create a new document
documentRouter.post("/search",search);

documentRouter.post("/", 
  uploadFile({
  folder: "./uploads",
  acceptedTypes: [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
  fieldName: "filePath",
  fileName: "doc",
  multiple: false,
}), createDocument);


// Route to get all documents
documentRouter.get("/", getDocuments);

// Route to get a single document by ID
documentRouter.get("/:id", getDocumentById);

// Route to update a document by ID
documentRouter.put("/:id", updateDocument);

// Route to delete a document by ID
documentRouter.delete("/:id", deleteDocument);

module.exports = documentRouter;
