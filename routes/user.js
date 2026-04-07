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
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
  return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect email or password",
    })
  }
})

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
})



module.exports =router;
