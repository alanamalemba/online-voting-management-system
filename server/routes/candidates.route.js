const express = require("express");

const { candidates } = require("../models");

const router = express.Router();

//get all candidates of this election
router.get("/election/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;
    const candidateList = await candidates.findAll({
      where: { election_id: eid },
    });

    res.json({ success: { data: candidateList } });
  } catch (error) {
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
