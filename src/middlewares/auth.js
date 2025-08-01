const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("You are not loggedIn");
    }
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedData;
    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("Invalid User");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
};
module.exports = {
  userAuth,
};
