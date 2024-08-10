const { getUser } = require("../service/auth");

async function checkAuth(req, res, next) {
  const userID = req.cookies?.uid;

  if (!userID) {
    return res.redirect("/login");
  }

  const user = await getUser(userID);

  if (!user) {
    return res.redirect("/login");
  }

  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.json({ status: "Unauthorized" });
    }
    return next();
  };
}

module.exports = {
  checkAuth,
  restrictTo,
};
