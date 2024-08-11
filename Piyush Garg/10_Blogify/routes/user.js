const express = require("express");
const user = require("../models/user");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/userProfiles`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const { fullName, email, password } = req.body;
  let picData = "";
  if (req.file) {
    picData = `/userProfiles/${req.file.filename}`;
  } else {
    picData = "/userProfiles/default.png";
  }
  try {
    await user.create({
      fullName,
      email,
      password,
      profileImageUrl: picData,
    });
  } catch (error) {
    return res.render("signup");
  }

  console.log(picData)

  return res.redirect("/");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  // Logic for sign in
  const { email, password } = req.body;
  try {
    const token = await user.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect Password or E-mail" });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
