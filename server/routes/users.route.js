const express = require("express");
const { users } = require("../models");

const router = express.Router();

function handleError(res, error) {
  console.log(error.message);
  res.json({ error: { message: "Internal server Error!" } });
}

// get all users
router.get("/", async (req, res) => {
  try {
    const usersList = await users.findAll();
    res.json({ success: { data: usersList } });
  } catch (error) {
    handleError(res, error);
  }
});

// get user with this uid
router.get("/user/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await users.findByPk(uid);

    res.json({ success: { data: user } });
  } catch (error) {
    handleError(res, error);
  }
});

// update user role
router.patch("/update-role", async (req, res) => {
  try {
    const request = req.body;
    await users.update(
      { role: request.newRole },
      { where: { id: request.uid } }
    );

    res.json({ success: { message: "Role updates successfully!" } });
  } catch (error) {
    handleError(res, error);
  }
});

// edit account
router.patch("/edit-account", async (req, res) => {
  try {
    const request = req.body;
    await users.update(
      { first_name: request.firstName, last_name: request.lastName },
      { where: { id: request.uid } }
    );

    res.json({ success: { message: "Account Edited successfully!" } });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
