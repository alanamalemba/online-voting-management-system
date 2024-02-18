const express = require("express");
const { candidate_applications, users, positions } = require("../models");
const { where } = require("sequelize");

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

//update application status
router.post("/update/status/:aid", async (req, res) => {
  try {
    const aid = req.params.aid;
    const status = req.body.status;
    console.log(aid, status);

    const application = await candidate_applications.update(
      { status: status },
      { where: { id: aid } }
    );

    console.log(application);
    res.json("status updated succesfully");
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

// Get all candidate applications that have that election_id including their name
router.get("/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;

    const applications = await candidate_applications.findAll({
      where: { election_id: eid },
    });

    const applicationsList = await Promise.all(
      applications.map(async (application) => {
        const user = await users.findOne({
          where: { id: application.user_id },
        });

        const position = await positions.findOne({
          where: { id: application.position_id },
        });

        return {
          ...application.toJSON(),
          name: user.name,
          position: position.name,
        };
      })
    );

    res.json(applicationsList);
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
