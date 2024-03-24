const express = require("express");

const { votes, voters } = require("../models");

const router = express.Router();

//submit votes
router.post("/", async (req, res) => {
  try {
    const request = req.body;

    await votes.bulkCreate(request.votes);

    await voters.update(
      { voted: true },
      { where: { user_id: request.uid, election_id: request.eid } }
    );

    res.json({ success: { message: "Ballot votes submitted Successfully!" } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
