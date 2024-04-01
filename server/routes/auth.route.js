const express = require("express");
const bcrypt = require("bcrypt");
const generateRandomString = require("../utilities/generateRandomString");
const { users, verification_codes } = require("../models");
const sendEmail = require("../utilities/sendEmail");

const router = express.Router();

// Sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { email } = req.body;

    //first check if user exists
    const userExists = await users.findOne({ where: { email: email } });

    // If user exists send an error and return
    if (userExists) {
      return res.json({
        error: { message: `User by email '${email}' already exists!'` },
      });
    }

    // if user does not exist send otp code
    const code = generateRandomString(6);

    await sendEmail(
      "User",
      email,
      "VERIFICATION OF VOTING SYSTEM ACCOUNT",
      `Please use this OTP code to verify your account.
       If you did not attempt to create a voting system account,
        please ignore this email. OTP Code: <b>${code}</b>`
    );

    await verification_codes.create({ email: email, code: code });

    res.json({ success: { message: "Verification code sent to your email." } });

    setTimeout(async () => {
      try {
        const verification = await verification_codes.findOne({
          where: { email: email, code: code },
        });

        if (verification) {
          await verification.destroy();
          console.log(`Verification code for ${email} has been deleted.`);
        }
      } catch (error) {
        console.error(
          "Error occurred while cleaning up verification code:",
          error
        );
      }
    }, 240000);
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

//verify sign up code
router.post("/verify/sign-up", async (req, res) => {
  try {
    const { user, code } = req.body;

    const codeExists = await verification_codes.findOne({
      where: { email: user.email, code: code },
    });
    if (!codeExists) {
      return res.json({ error: { message: "Invalid verification code!" } });
    }

    const userExists = await users.findOne({ where: { email: user.email } });
    if (userExists) {
      codeExists.destroy();
      return res.json({ success: { data: userExists } });
    }

    // If code is valid, encrypt password and create user account
    const password = user.password;
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;

    const data = await users.create(user);
    res.json({ success: { data: data } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = req.body;

    //first check if user exists
    const userData = await users.findOne({ where: { email: user.email } });

    // If user does not exists send an error and return
    if (!userData) {
      return res.json({
        error: { message: `User by email '${user.email}' does not exists!'` },
      });
    }

    //if user exists, compare stored vs sent password
    const password = user.password;
    const passwordsMatch = await bcrypt.compare(password, userData.password);
    if (!passwordsMatch) {
      return res.json({
        error: { message: `Wrong email or password!` },
      });
    }

    //if passwords match
    const code = generateRandomString(6);

    await sendEmail(
      userData.first_name,
      userData.email,
      "TWO FACTOR AUTHENTICATION OF VOTING SYSTEM LOGIN",
      `Please use this OTP code to authenticate your login.
       OTP Code: <b>${code}</b>`
    );

    await verification_codes.create({ email: user.email, code: code });

    res.json({ success: { message: "OTP code sent to your email." } });

    setTimeout(async () => {
      try {
        const verification = await verification_codes.findOne({
          where: { email: email, code: code },
        });

        if (verification) {
          await verification.destroy();
          console.log(`Verification code for ${email} has been deleted.`);
        }
      } catch (error) {
        console.error(
          "Error occurred while cleaning up verification code:",
          error
        );
      }
    }, 240000);
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

router.post("/verify/login", async (req, res) => {
  try {
    const { email, code } = req.body;

    const codeExists = await verification_codes.findOne({
      where: { email: email, code: code },
    });

    if (!codeExists) {
      return res.json({ error: { message: "Invalid verification code!" } });
    }

    const userData = await users.findOne({ where: { email: email } });
    res.json({ success: { data: userData } });
    codeExists.destroy();
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

module.exports = router;
