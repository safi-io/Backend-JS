const user = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password, role } = req.body;
  await user.create({
    name,
    email,
    password,
    role,
  });

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const userData = await user.findOne({ email, password });

  if (!userData) {
    return res.render("login");
  }

  const token = setUser(userData);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
