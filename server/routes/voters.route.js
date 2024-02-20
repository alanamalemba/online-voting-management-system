const express = require("express");
const { voters } = require("../models");

const router = express.Router();

router.get("/:uid/:eid", async (req, res) => {
  try {
    const voter = await voters.findOne({
      where: { user_id: req.params.uid, election_id: req.params.eid },
    });

    if (!voter) {
      res.json(null);
      return;
    }

    res.json(voter);
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const voter = req.body;
    await voters.create(voter);
    res.json("successfully updated voter information");
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

router.post("/voted", async (req, res) => {
  try {
    const { uid, eid } = req.body;
    await voters.update(
      { voted: true },
      { where: { user_id: uid, election_id: eid } }
    );
    res.json("successfully updated voter information");
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
