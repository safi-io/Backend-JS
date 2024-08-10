const express = require("express");
const app = express();
const port = 4000;

app.set("view engine", "ejs");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/", upload.single("uploadFile"), (req, res) => {
    res.json({ status: "file upload" });
  });
  

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(port, () => console.log("server on port", port));
