const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Surendra",
    lastName: "Vallabhani",
    emailId: "surendra@gmail.com",
    password: "surendra@123",
  });
  //creating a new instance of the user model
  //const user = new User(userObj);
  try {
    await user.save();
    res.send("user saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is listening on port no 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
