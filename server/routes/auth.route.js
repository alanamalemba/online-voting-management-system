const express = require("express");
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ where: { email: email } });
    if (!user) {
      res.json({ error: "User does not exist!" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.json({ error: "Wrong username or password!" });
      return;
    }

    const accessToken = sign({ email: user.email, id: user.id }, "secretKey");
    res.json({ user: user, accessToken: accessToken });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal Server Error: " + error.message });
  }
});

// Create Account
router.post("/create-account", async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await users.findOne({ where: { email: email } });
    if (userExists) {
      console.log("User with this email already exists!");
      return res.json({ error: "User with this email already exists!" });
    }

    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await users.create({
      ...req.body,
      password: hash,
    });

    const user = await users.findOne({ where: { email: req.body.email } });

    const accessToken = sign({ email: user.email, id: user.id }, "secretKey");

    res.json({
      success: "Successfully created account for: " + req.body.name,
      user: user,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal Server Error: " + error.message });
  }
});

module.exports = router;
