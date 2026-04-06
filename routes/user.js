const {Router} = require("express");
const { handleUserSignup } = require("../controllers/user");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", handleUserSignup);
router.post("/signin", async(req, res) => {
  const {email, password} = req.body;
  const user = User.matchPassword(email, password)
  console.log('User : ', user);
  return res.redirect("/");
})



module.exports =router;
