const express = require("express");
const app = express();
const port = 4000;
const users = require("./MOCK_DATA.json");

// Sending Users Data as a HTML
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

// Sending All Users Data as JSON
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const info = users.filter((user) => user.id === id);
    if (info.length > 0) {
      res.send(info);
    } else {
      res.send("User not available for this id.");
    }
  })
  .put((req, res) => {
    // Todo
    res.json({ status: "put pending" });
  })
  .patch((req, res) => {
    // Todo
    res.json({ status: "patch pending" });
  })
  .delete((req, res) => {
    // Todo
    res.json({ status: "delete pending" });
  });

// Post Request
app.post("/api/users", (req, res) => {
  // Todo
  res.json({ status: "post pending" });
});

// Server Listening
app.listen(port, () => {
  console.log(`Server on port ${port}.`);
});
