const { v4: uuidv4 } = require("uuid");
const user = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const userData = await user.findOne({ email, password });

  if (!userData) {
    return res.render("login");
  }

  const sessionId = uuidv4();
  setUser(sessionId, userData);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
