const express = require("express");
const { candidate_applications } = require("../models");
const upload = require("../middleware/upload");

const router = express.Router();

// submit candidate application
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
      const { userId, studentId, electionId, positionId } = req.body;
      const application = await candidate_applications.create({
        user_id: userId,
        passport_photo_url: passPhotoPath,
        id_photo_url: idPhotoPath,
        student_id: studentId,
        election_id: electionId,
        position_id: positionId,
      });

      res.json({
        success: {
          message: "Candidate application submitted successfully!",
          data: application,
        },
      });
    } catch (error) {
      console.log(error.message);
      res.json({ error: { message: "Internal Server Error" } });
    }
  }
);

// get a candidate application of this user id
router.get("/application/:uid/:eid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const eid = req.params.eid;
    const application = await candidate_applications.findOne({
      where: { user_id: uid, election_id: eid },
    });

    res.json({ success: { data: application } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

module.exports = router;
