const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://keerthi:apple@cluster0.ca2z2yw.mongodb.net/devConnect"
  );
};

module.exports = connectDB;
