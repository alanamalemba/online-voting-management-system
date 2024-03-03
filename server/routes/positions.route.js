const express = require("express");
const { positions } = require("../models");

const router = express.Router();

// get all positions in an election with this eid
router.get("/election/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;

    const positionsList = await positions.findAll({
      where: { election_id: eid },
    });

    res.json({ success: { data: positionsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

module.exports = router;
