const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello Node JS");
});
app.use("/test", (req, res) => {
  res.send("Hello from the node server");
});
app.listen(3000, () => {
  console.log("Server is listening on port no 3000");
});
