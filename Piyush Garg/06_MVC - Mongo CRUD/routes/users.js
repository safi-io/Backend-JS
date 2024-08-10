const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  handleGetUserById,
} = require("../controllers/user");

// For request on users

router
  .route("/")
  .get(handleGetAllUsers)
  .post(handleCreateNewUser);


// For request on users with id

router
  .route("/:id")
  .get(handleGetUserById)
  .delete(handleDeleteUser)
  .patch(handleUpdateUser);

module.exports = router;
