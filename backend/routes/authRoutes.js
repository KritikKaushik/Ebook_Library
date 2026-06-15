const express = require("express");

const {
  registerUser,
  registerAdmin,
  registerAuthor,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register-author", registerAuthor);

router.post("/register", registerUser);

router.post("/register-admin", registerAdmin);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

module.exports = router;
