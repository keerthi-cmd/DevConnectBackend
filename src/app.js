const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  //creating a new instance of the user model
  //const user = new User(userObj);
  try {
    await user.save();
    res.send("user saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch {
    res.status(404).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const id = req.body.userId;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const id = req.body.userId;
  const body = req.body;
  console.log(id);
  console.log(body);
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
      //  res.status(400).send("Update not allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: id }, body, {
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
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
