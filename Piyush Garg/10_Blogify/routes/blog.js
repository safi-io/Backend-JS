const express = require("express");
const blog = require("../models/blog");
const comment = require("../models/comment");
const multer = require("multer");
const path = require("path");
const { checkInitialAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/add-new", checkInitialAuth, (req, res) => {
  return res.render("addBlog", { user: req.user });
});

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// To post a Blog
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const data = await blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  res.redirect(`/blog/${data._id}`);
});

// To view a specific Blog
router.get("/:slug", async (req, res) => {
  const providedID = req.params.slug;
  const data = await blog.findOne({ _id: providedID }).populate("createdBy");
  const comments = await comment
    .find({ blogId: req.params.slug })
    .populate("createdBy")
    .sort({ createdAt: -1 });
  return res.render("blog", { blog: data, user: req.user, comments });
});

// To post a comment

router.post("/comment/:slug", async (req, res) => {
  await comment.create({
    content: req.body.content,
    blogId: req.params.slug,
    createdBy: req.user._id,
  });
  res.redirect(`/blog/${req.params.slug}`);
});

// To Delete a blog

router.post("/delete/:slug", async (req, res) => {
  const providedBlogID = req.params.slug;
  const data = await blog.findOne({ _id: providedBlogID });
  if (req.user._id.toString() === data.createdBy._id.toString()) {
    await blog.deleteOne({ _id: providedBlogID });
  }
  return res.redirect("/");
});

// To Edit a blog - Phase 1

router.get("/edit/:slug", async (req, res) => {
  const providedBlogID = req.params.slug;
  // const data = await blog.findOne({ _id: providedBlogID });
  // if (req.user._id.toString() === data.createdBy._id.toString()) {
  // await blog.deleteOne({ _id: providedBlogID });
  // }
  res.render("editBlog", { mainID: providedBlogID, user: req.user });
});

// To edit a blog - Phase 2

router.post("/edit/:slug", async (req, res) => {
  const providedBlogID = req.params.slug;
  const { title, body } = req.body;
  const data = await blog.findOne({ _id: providedBlogID });

  if (req.user._id.toString() === data.createdBy._id.toString()) {
    await blog.findByIdAndUpdate(providedBlogID, { title, body });
  }

  return res.redirect(`/blog/${req.params.slug}`);
});

module.exports = router;
