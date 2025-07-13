const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const validateSignupData = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/user");
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  //const user = new User(userObj);
  try {
    //Validating signup Data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send("user saved successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = user.validatePswd(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(user.getJWT());
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 36000000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user.firstName + " sending a connection request");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(404).send("Something went wrong");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch {
//     res.status(404).send("Something went wrong");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const id = req.body.userId;
//   try {
//     const deleteUser = await User.findByIdAndDelete({ _id: id });
//     res.send("user deleted successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.patch("/user", async (req, res) => {
//   const id = req.body.userId;
//   const body = req.body;
//   try {
//     const ALLOWED_UPDATES = [
//       "userId",
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills",
//     ];
//     const isUpdateAllowed = Object.keys(body).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//       //  res.status(400).send("Update not allowed");
//     }
//     const user = await User.findByIdAndUpdate({ _id: id }, body, {
//       runValidators: true,
//     });
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(404).send("Something went wrong");
//   }
// });

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
