const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
