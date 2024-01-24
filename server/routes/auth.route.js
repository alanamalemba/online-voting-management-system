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
    res.json({ error: "Internal server Error" });
  }
});

// Create Account
router.post("/create-account", async (req, res) => {
  try {
    const { password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await users.create({
      ...req.body,
      password: hash,
    });

    const user = req.body;

    res.json("Successfully created account for: " + req.body.name);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

module.exports = router;
