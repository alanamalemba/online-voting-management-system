const express = require("express");
const { positions } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const positionsList = await positions.findAll();
    res.json(positionsList);
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

module.exports = router;