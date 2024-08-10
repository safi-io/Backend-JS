const fs = require("fs");

function logReqRes(file) {
  return (req, res, next) => {
    fs.appendFile(
      file,
      `A new ${
        req.method
      } Request is initiated at ${new Date().toLocaleString()}. \n`,
      () => {
        next();
      }
    );
  };
}

module.exports = {
  logReqRes,
};
