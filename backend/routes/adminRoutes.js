const express = require("express");

const {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllBooks,
  updateBookAdmin,
  deleteBookAdmin,
  getAllReviews,
  deleteReviewAdmin,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ==================== USERS ====================

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.put(
  "/users/:id",
  protect,
  authorize("admin"),
  updateUser
);

router.delete(
  "/user/:id",
  protect,
  authorize("admin"),
  deleteUser
);

// ==================== BOOKS ====================

router.get(
  "/books",
  protect,
  authorize("admin"),
  getAllBooks
);

router.put(
  "/books/:id",
  protect,
  authorize("admin"),
  upload.single("cover"),
  updateBookAdmin
);

router.delete(
  "/book/:id",
  protect,
  authorize("admin"),
  deleteBookAdmin
);

// ==================== REVIEWS ====================

router.get(
  "/reviews",
  protect,
  authorize("admin"),
  getAllReviews
);

router.delete(
  "/review/:id",
  protect,
  authorize("admin"),
  deleteReviewAdmin
);

// ==================== DASHBOARD ====================

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

module.exports = router;