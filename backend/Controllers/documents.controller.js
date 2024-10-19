const Document = require("../Models/documents.model");
module.exports = {
  // Create a new document
  createDocument: async (req, res) => {
    try {
      // Get the file path from the uploaded file
      console.log("File:", req.file); // Check the uploaded file
      console.log("Body:", req.body);
      const filePath = req.file.path;

      // Create the document object with the file path and other details
      const document = new Document({
        name: req.body.name,
        filePath: filePath,
        description: req.body.description,
      });

      // Save the document to the database
      await document.save();

      // Return the created document
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all documents
  getDocuments: async (req, res) => {
    try {
      const documents = await Document.find().sort({ createdAt: -1 });
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  search: async (req, res) => {
    try {
      const query = req.body.query || ""; // Ensure query is always a string
      // Define the search criteria to look for matches in all string fields
      const searchCriteria = {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      };
      const assets = await Document.find(searchCriteria);
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Get a single document by ID
  getDocumentById: async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a document by ID
  updateDocument: async (req, res) => {
    try {
      const document = await Document.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      res.status(200).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a document by ID
  deleteDocument: async (req, res) => {
    try {
      const document = await Document.findByIdAndDelete(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
