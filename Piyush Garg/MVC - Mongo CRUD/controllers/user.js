const user = require("../models/user.js")

async function handleGetAllUsers(req, res) {
  const allUserData = await user.find({});
  return res.status(200).send(allUserData);
}

async function handleGetUserById(req, res) {
  if (req.params.id.length != 24) {
    return res.status(404).json({ status: "ID is incorrect" });
  }
  const idUserData = await user.findById(req.params.id);
  if (idUserData) {
    return res.status(200).send(idUserData);
  } else {
    return res.status(404).json({ status: "ID not found" });
  }
}

async function handleCreateNewUser(req, res) {
  if (req.body.full_name && req.body.email && req.body.gender) {
    const data = new user({
      full_name: req.body.full_name,
      email: req.body.email,
      gender: req.body.gender,
    });
    try {
      await data.save();
      res.status(200).json({ status: `Data submitted and ID is ${data._id}` });
    } catch (error) {
      res
        .status(500)
        .json({ status: "Error saving data", error: error.message });
    }
  } else {
    console.log(req.body.gender)
    res.status(400).json({ status: "All fields are requried!" });
  }
}

async function handleDeleteUser(req, res) {
  await user.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .send({ status: `User Deleted for ID: ${req.params.id}` });
}

async function handleUpdateUser(req, res) {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          full_ame: req.body.full_name,
          email: req.body.email,
          gender: req.body.gender,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: "User not found" });
    }

    return res.status(200).json({ status: "Updated", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: error.message });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
};
