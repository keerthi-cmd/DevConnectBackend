const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  //const user = new User(userObj);
  try {
    //Validating signup Data
    validateSignupData(req);
    const { firstName, lastName, emailId, password, gender, about } = req.body;
    //Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      gender,
      about,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePswd(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 36000000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfully");
});

authRouter.patch("/forgetPswd", userAuth, async (req, res) => {
  try {
    //Assuming user is logged in
    const loggedInUser = req.user;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    loggedInUser.password = hashPassword;
    await loggedInUser.save();
    res.send(loggedInUser.password);
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});
module.exports = authRouter;
