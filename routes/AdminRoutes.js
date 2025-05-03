const express = require("express");
const router = express.Router();
const {
  getUserStats,
  getAllUsers,
  deleteUser,
  editUser,
} = require("../controllers/adminController");

router.get("/userstats", getUserStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", editUser);

module.exports = router;
