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

// Get all candidate applications that have that election_id
router.get("/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;

    const applications = await candidate_applications.findAll({
      where: { election_id: eid },
    });

    res.json(applications);
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

// get the status of a candidate application with that election_id and
//  where the user_id is uid
router.get("/:eid/:uid", async (req, res) => {
  try {
    const eid = req.params.eid;
    const uid = req.params.uid;

    const application = await candidate_applications.findOne({
      where: { election_id: eid, user_id: uid },
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
