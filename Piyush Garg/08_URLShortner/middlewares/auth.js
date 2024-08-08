const { getUser } = require("../service/auth");

function restrictToLogIn(req, res, next) {
  try {
    const userID = req.cookies?.uid; // Accessing cookies is synchronous
    if (!userID) {
      return res.redirect("/login");
    }

    const user = getUser(userID); // Retrieve user synchronously
    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in restrictToLogIn middleware:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function checkAuth(req, res, next) {
  const userID = req.cookies?.uid; // Accessing cookies is synchronous

  const user = getUser(userID); // Retrieve user synchronously

  req.user = user;
  next();
}

module.exports = {
  restrictToLogIn,
  checkAuth,
};
