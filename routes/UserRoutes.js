const express = require("express");
const router = express.Router();
const loginUser = require("../controllers/userController");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.post("/signin", async (req, res) => {
  const { firstname, lastname, password, email, contact } = req.body;

  if (!firstname || !lastname || !password || !email || !contact) {
    return res.status(400).send("Please enter all required fields");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userResult = await User.create({
      firstname,
      lastname,
      password: hashedPassword, // Store hashed password
      email,
      contact,
      role: email === "admin@gmail.com" ? "admin" : "user",
    });

    console.log(userResult);
    return res.status(200).json({ message: "Successfully created user" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(400).send(err.message);
  }
});
// count number of users in database

router.post("/login", loginUser);
module.exports = router;
