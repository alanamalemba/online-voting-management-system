const express = require("express");
const bcrypt = require("bcrypt");
const { users } = require("../models");
const { where } = require("sequelize");

const router = express.Router();

// Create Account
router.post("/sign-up", async (req, res) => {
  try {
    const user = req.body;

    //first check if user exists
    const userExists = await users.findOne({ where: { email: user.email } });

    // If user exists send an error and return
    if (userExists) {
      res.json({
        status: "error",
        message: `User by email '${user.email}' already exists!'`,
      });

      return;
    }

    //If user does not exist, encrypt password and store user information
    const password = user.password;
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;

    const data = await users.create(user);
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "failed", message: "Internal Server Error!" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = req.body;

    //first check if user exists
    const userData = await users.findOne({ where: { email: user.email } });

    // If user does not exists send an error and return
    if (!userData) {
      res.json({
        status: "error",
        message: `User by email '${user.email}' does not exists!'`,
      });

      return;
    }

    //if user exists, compare stored vs sent password
    const password = user.password;
    const passwordsMatch = await bcrypt.compare(password, userData.password);
    if (!passwordsMatch) {
      res.json({
        status: "error",
        message: `Wrong email or password!`,
      });

      return;
    }

    res.json(userData);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "failed", message: "Internal Server Error!" });
  }
});

module.exports = router;
