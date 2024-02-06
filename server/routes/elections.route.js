const express = require("express");
const { elections } = require("../models");
const { positions } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const electionsList = await elections.findAll();
    res.json(electionsList);
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const election = await elections.findByPk(id);
    res.json(election);
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server Error!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const election = req.body;
    const { id } = await elections.create(election.data);

    const positionsData = election.positions.map((position) => ({
      name: position,
      election_id: id,
    }));
    await positions.bulkCreate(positionsData);

    res.json({
      success: `${election.data.name} election created successfully!`,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
