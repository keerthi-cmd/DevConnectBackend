const validate = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Invalid userName");
  } else if (!validate.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validationEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignupData, validationEditProfileData };
