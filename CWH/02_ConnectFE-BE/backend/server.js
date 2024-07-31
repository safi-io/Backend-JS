import express from "express";

const app = express();

// app.get("/", (req, res) => {
//   res.send("HI, I am safi");
// });

// Get a List of 5 Jokes

app.get('/api/jokes', (req, res) => {
  const jokes = [
    { id: 1, title: "A1 Joke", content: "No. 1 Joke" },
    { id: 2, title: "A2 Joke", content: "No. 2 Joke" },
    { id: 3, title: "A3 Joke", content: "No. 3 Joke" },
    { id: 4, title: "A4 Joke", content: "No. 4 Joke" },
    { id: 5, title: "A5 Joke", content: "No. 5 Joke" },
  ];
  res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
