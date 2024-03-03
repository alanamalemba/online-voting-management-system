const express = require("express");
const upload = require("../middleware/upload");
const { elections, positions } = require("../models");

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
router.get("/", upload.single("file"), async (req, res) => {
  try {
    const electionsList = await elections.findAll();
    res.json({ success: { data: electionsList } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
