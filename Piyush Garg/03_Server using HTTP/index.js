const http = require("http"); // To make server
const fs = require("fs"); // File System Hnadling
const url = require("url"); // Uniform Resource Locater

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  let data = `Request Type is ${
    req.method
  } at ${new Date().toLocaleString()} to ${req.url}\n`;

  const myUrl = url.parse(req.url, true);
  // to parse url, and get query parameters.
  // True parses the query string into a JavaScript object.

  fs.appendFile("serverLogs.txt", data, (err, data) => {
    res.end(`Hello ${myUrl.query.name} from Node's Server.`);
  });
});

myServer.listen(8000, () => {
  console.log("Server on port 8000.");
});
