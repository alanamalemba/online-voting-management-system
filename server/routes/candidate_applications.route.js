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

module.exports = router;
