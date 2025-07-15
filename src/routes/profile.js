const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validationEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validationEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key])); // updating the fields
    await loggedInUser.save();
    res.json(`${loggedInUser.firstName}your profile updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

module.exports = profileRouter;
