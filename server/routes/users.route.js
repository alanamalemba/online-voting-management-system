const express = require("express");
const { users } = require("../models");

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await users.findOne({ where: { email: userEmail } });

    if (!user) {
      res.json({ error: `${userEmail} does not exist` });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
