const express = require("express");
const { candidates } = require("../models");

const router = express.Router();

router.get("/:uid/:eid", async (req, res) => {
  try {
    const candidate = await candidates.findOne({
      where: { user_id: req.params.uid, election_id: req.params.eid },
    });

    if (!candidate) {
      res.json(null);
      return;
    }

    res.json(candidate);
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

router.post("", async (req, res) => {
  try {
    const candidate = req.body;
    await candidates.create(candidate);
    res.json("Candidate information saved succesfully!");
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
