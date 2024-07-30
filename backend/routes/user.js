const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST request to add a new user
router.post("/add", async (req, res) => {
  const { name, surname } = req.body;

  try {
    const newUser = new User({
      name,
      surname,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
