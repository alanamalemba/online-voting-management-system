const express = require("express");
const { votes } = require("../models");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const votesList = req.body;

    await votes.bulkCreate(votesList);

    res.json("Ballot successfully submitted!");
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
