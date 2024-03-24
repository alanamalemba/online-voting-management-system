const express = require("express");

const { voters } = require("../models");

const router = express.Router();

// get  a voter in this election with this uid
router.get("/:eid/:uid", async (req, res) => {
  try {
    const { eid, uid } = req.params;

    const voter = await voters.findOne({
      where: { election_id: eid, user_id: uid },
    });

    res.json({ success: { data: voter } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
