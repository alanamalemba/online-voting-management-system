const express = require("express");
const { elections } = require("../models");

const router = express.Router();

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
