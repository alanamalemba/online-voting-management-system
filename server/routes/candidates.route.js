const express = require("express");

const { candidates, users } = require("../models");

const router = express.Router();

// get candidate names with this cid
router.get("/candidate-names/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;

    const user = await candidates.findByPk(cid, { attributes: ["user_id"] });

    const candidateNames = await users.findByPk(user.user_id, {
      attributes: ["first_name", "last_name"],
    });

    res.json({ success: { data: candidateNames } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get all candidates of this election
router.get("/election/:eid", async (req, res) => {
  try {
    const eid = req.params.eid;
    const candidateList = await candidates.findAll({
      where: { election_id: eid },
    });

    res.json({ success: { data: candidateList } });
  } catch (error) {
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
