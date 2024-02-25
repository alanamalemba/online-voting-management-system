const express = require("express");
const upload = require("../middleware/upload");
const { elections } = require("../models");

const router = express.Router();

// create election
router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Accessing the file path
    const filePath = req.file.path;
    const { name, startDate, endDate } = req.body;

    await elections.create({
      name: name,
      start_date: startDate,
      end_date: endDate,
      photo_url: filePath,
    });

    res.json({
      success: { message: `Election '${name}' created successfully!` },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
