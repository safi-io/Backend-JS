const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/auth");

// Schema of User
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/userProfiles/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Hasing Password using Crypto Library
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPass = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPass;
  next();
});

// To Match Password After Sign-in and Return Token
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const userData = await this.findOne({ email });
    if (!userData) {
      throw new Error("User not found in Database");
    }

    const salt = userData.salt;
    const hashedPass = userData.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPass !== userProvidedHash) {
      throw new Error("Incorrect Password");
    }

    const token = createTokenForUser(userData);
    return token;
  }
);

// Model
const user = mongoose.model("user", userSchema);

module.exports = user;
