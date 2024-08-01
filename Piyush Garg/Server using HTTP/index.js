const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  let data = `Request Type is ${
    req.method
  } at ${new Date().toLocaleString()} to ${req.url}\n`;

  const myUrl = url.parse(req.url, true);

  fs.appendFile("serverLogs.txt", data, (err, data) => {
    res.end(`Hello ${myUrl.query.name} from Node's Server.`);
  });
});

myServer.listen(8000, () => {
  console.log("Server on port 8000.");
});
