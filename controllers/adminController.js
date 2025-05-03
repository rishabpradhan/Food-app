const User = require("../models/userSchema");

exports.getUserStats = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user count" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { firstname, lastname, email, contact } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email, contact },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};
