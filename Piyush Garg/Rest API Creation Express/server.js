const express = require("express");
const fs = require("fs");
const app = express();
const port = 4000;
const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));

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
  .patch((req, res) => {
    const id = Number(req.params.id);
    const updateData = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updateData };

      console.log(users[userIndex])

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        res.send("Data editied")
      });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const newData = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newData), (err, data) => {
      res.send(`Data Deleted for id ${id}`);
    });
  });

// Post Request
app.post("/api/users", (req, res) => {
  const data = req.body;
  users.push({ ...data, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.send(`Data added at id:- ${users.length}`);
  });
});

// Server Listening
app.listen(port, () => {
  console.log(`Server on port ${port}.`);
});
