const { validateToken } = require("../services/auth");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch {}
    next();
  };
}

function checkInitialAuth(req, res, next) {
  const tokenCookieValue = req.cookies["token"];
  if (!tokenCookieValue) {
    return res.render("signin", {errorType : "You must sign in first."});
  }
  next();
}

module.exports = { checkForAuthCookie, checkInitialAuth };
