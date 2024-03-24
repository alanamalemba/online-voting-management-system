const express = require("express");

const { votes } = require("../models");

const router = express.Router();

//submit votes
router.post("/", async (req, res) => {
  try {
    const votesList = req.body;

    await votes.bulkCreate(votesList);

    res.json({ success: { message: "Ballot votes submitted Successfully!" } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
