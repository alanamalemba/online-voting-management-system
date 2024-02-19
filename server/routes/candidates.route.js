const express = require("express");
const { candidates } = require("../models");

const router = express.Router();

router.get("/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;
    const candidatesList = await candidates.findAll({
      where: { election_id: eid },
    });

    res.json(candidatesList);
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

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
