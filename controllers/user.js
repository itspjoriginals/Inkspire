const User = require('../models/user');

const handleUserSignup = async(req, res) => {
  const {fullName, email, password} = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
};


module.exports = {
  handleUserSignup,
}