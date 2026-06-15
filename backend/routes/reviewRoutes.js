const express = require("express");

const {
  addReview,
  getBookReviews,
  deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add Review
router.post("/", protect, addReview);

// Get Reviews For Book
router.get("/:bookId", getBookReviews);

// Delete Review
router.delete("/:id", protect, deleteReview);

module.exports = router;