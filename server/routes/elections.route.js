const express = require("express");
const { Op } = require("sequelize");
const upload = require("../middleware/upload");
const { elections, positions, voters } = require("../models");

const router = express.Router();

// create election
router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Accessing the file path
    const filePath = req.file.path;
    const { name, startDate, endDate, positionsList } = req.body;

    const election = await elections.create({
      name: name,
      start_date: startDate,
      end_date: endDate,
      photo_url: filePath,
    });

    // Create positions in batch
    const positionsArray = JSON.parse(positionsList);
    const positionsData = positionsArray.map((position) => ({
      name: position,
      election_id: election.id,
    }));

    await positions.bulkCreate(positionsData);

    res.json({
      success: { message: `Election '${name}' created successfully!` },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get all elections
router.get("/", async (req, res) => {
  try {
    const electionsList = await elections.findAll();
    res.json({ success: { data: electionsList } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get election with this eid
router.get("/election/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;
    const election = await elections.findByPk(eid);
    res.json({ success: { data: election } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get all elections of a user that user with this id is
// registered in
router.get("/user-registered/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;

    const votersList = await voters.findAll({
      where: { user_id: uid },
    });

    const idList = votersList.map((voter) => voter.election_id);

    const electionsList = await elections.findAll({
      where: { id: { [Op.in]: idList } },
    });

    res.json({ success: { data: electionsList } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

// edit elections
router.patch("/edit-election/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;
    const response = req.body;

    const election = await elections.findByPk(eid);

    election.name = response.electionName;
    election.start_date = response.startDate;
    election.end_date = response.endDate;

    election.save();

    res.json({ success: { message: "Election Edited Succesfully!" } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
