require('dotenv').config()

const express = require("express");
const app = express();
// const port = 3000;

const githubData = {
  login: "safi-io",
  id: 145552372,
  node_id: "U_kgDOCKzz9A",
  avatar_url: "https://avatars.githubusercontent.com/u/145552372?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/safi-io",
  html_url: "https://github.com/safi-io",
  followers_url: "https://api.github.com/users/safi-io/followers",
  following_url: "https://api.github.com/users/safi-io/following{/other_user}",
  gists_url: "https://api.github.com/users/safi-io/gists{/gist_id}",
  starred_url: "https://api.github.com/users/safi-io/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/safi-io/subscriptions",
  organizations_url: "https://api.github.com/users/safi-io/orgs",
  repos_url: "https://api.github.com/users/safi-io/repos",
  events_url: "https://api.github.com/users/safi-io/events{/privacy}",
  received_events_url: "https://api.github.com/users/safi-io/received_events",
  type: "User",
  site_admin: false,
  name: "Muhammad Safiullah Khan",
  company: null,
  blog: "safikhan.me",
  location: "Faisalabad, Punjab, Pakistan",
  email: null,
  hireable: null,
  bio: "Learning MERN Stack",
  twitter_username: "ranasafikhan",
  public_repos: 19,
  public_gists: 0,
  followers: 5,
  following: 8,
  created_at: "2023-09-20T09:17:45Z",
  updated_at: "2024-07-26T03:33:24Z",
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/safi", (req, res) => {
  res.send("<h1>My name is Safi, I create this server.</h1>");
});

app.get("/github", (req, res) => {
  res.json(githubData);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
