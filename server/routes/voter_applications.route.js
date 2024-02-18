const express = require("express");
const { voter_applications, users } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const voterApplication = req.body;

    await voter_applications.create(voterApplication);

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

    const application = await voter_applications.findOne({
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

// Get all candidate applications that have that election_id including their name
router.get("/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;

    const applications = await voter_applications.findAll({
      where: { election_id: eid },
    });

    const applicationsList = await Promise.all(
      applications.map(async (application) => {
        const user = await users.findOne({
          where: { id: application.user_id },
        });

        return {
          ...application.toJSON(),
          name: user.name,
        };
      })
    );

    res.json(applicationsList);
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

//update application status
router.post("/update/status/:aid", async (req, res) => {
  try {
    const aid = req.params.aid;
    const status = req.body.status;
    console.log(aid, status);

    await voter_applications.update({ status: status }, { where: { id: aid } });

    res.json("status updated succesfully");
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

module.exports = router;
