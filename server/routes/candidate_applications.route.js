const express = require("express");
const { candidate_applications } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const candidateApplication = req.body;

    await candidate_applications.create(candidateApplication);

    res.json({ success: " Application submitted Successfully!" });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

router.get("/:eid/:cid", async (req, res) => {
  try {
    const eid = req.params.eid;
    const cid = req.params.cid;

    const application = await candidate_applications.findOne({
      where: { election_id: eid, user_id: cid },
    });

    if (application) {
      res.json(application.status);
    } else {
      res.json(null);
    }
    
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

module.exports = router;
