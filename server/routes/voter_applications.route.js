const express = require("express");
const { voter_applications } = require("../models");
const upload = require("../middleware/upload");

const router = express.Router();

// submit voter application
router.post(
  "/submit-application",
  upload.fields([
    { name: "passPhoto", maxCount: 1 },
    { name: "idPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const passPhotoPath = req.files["passPhoto"][0].path; // Get passport photo file path
      const idPhotoPath = req.files["idPhoto"][0].path; // Get ID photo file path

      // Access other form data if needed
      const { userId, studentId, electionId } = req.body;
      const application = await voter_applications.create({
        user_id: userId,
        passport_photo_url: passPhotoPath,
        id_photo_url: idPhotoPath,
        student_id: studentId,
        election_id: electionId,
      });

      res.json({
        success: {
          message: "Voter application submitted successfully!",
          data: application,
        },
      });
    } catch (error) {
      console.log(error.message);
      res.json({ error: { message: "Internal Server Error" } });
    }
  }
);

// get a voter application of this user id
router.get("/application/:uid/:eid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const eid = req.params.eid;
    const application = await voter_applications.findOne({
      where: { user_id: uid, election_id: eid },
    });

    res.json({ success: { data: application } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

module.exports = router;
