const User = require("../Models/user.model");

// Create a new user
module.exports = {
  register: async (req, res) => {
    try {
      const { fullName, email, password, role } = req.body;
      if (!fullName || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const verifyEmail = await User.findOne({ email });
      if (verifyEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      await User.create({ fullName, email, password, role });
      res.status(201).json("User created successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }
      const user = await User.findOne({ email, password });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid credentials", success: false });
      }
      if (user.isArchived) {
        return res
          .status(400)
          .json({ message: "Votre compte est desactivé", success: false });
      }
      res.status(200).json({
        message: "Login successful",
        success: true,
        userId: user._id,
        role: user.role,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  getusers: async (req, res) => {
    try {
      const users = await User.find({ role: { $ne: "super_admin" } }).sort({
        createdAt: -1,
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const { role } = req.body;
      if (!role) {
        return res.status(400).json({ message: "Role is required" });
      }
      const user = await User.findByIdAndUpdate(req.params.id, { role });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json("User role updated successfully");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  toggleArchive: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isArchived = !user.isArchived;
      await User.findByIdAndUpdate(req.params.id, { isArchived });
      res.status(200).json("User archived successfully");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
