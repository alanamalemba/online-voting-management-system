const express = require("express");

const { students } = require("../models");

const router = express.Router();

//add student reg no
router.post("/", async (req, res) => {
  try {
    const regNo = req.body.regNo;

    await students.create({ reg_number: regNo });

    res.json({ success: { message: "Reg number added successfully!" } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal server Error" } });
  }
});

// get a student with this regNo
router.get("/student/:regNo", async (req, res) => {
  try {
    const regNo = req.params.regNo;
    const studentObj = await students.findOne({ where: { reg_number: regNo } });

    res.json({ success: { data: studentObj } });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal server Error" } });
  }
});

module.exports = router;
