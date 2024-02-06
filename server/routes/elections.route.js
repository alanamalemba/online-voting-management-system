const express = require("express");
const { elections } = require("../models");

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
    await elections.create(election);
    res.json({ success: `${election.name} election created succesfully!` });
  } catch (error) {
    console.error(error.message);
    res.json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
