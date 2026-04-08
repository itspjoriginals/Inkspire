const User = require('../models/user');

const handleUserSignup = async(req, res) => {
  const {fullName, email, password} = req.body;
  try {
  await User.create({ fullName, email, password });
  return res.redirect("/");
} catch (err) {
  return res.render("signup", {
    error: "Email already exists",
  });
}
  return res.redirect("/");
};


module.exports = {
  handleUserSignup,
}