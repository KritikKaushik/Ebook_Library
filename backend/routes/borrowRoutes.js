const express = require("express");

const {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getAllBorrows,
} = require("../controllers/borrowController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Borrow a book
router.post(
  "/borrow/:bookId",
  protect,
  borrowBook
);

// Return a book
router.put(
  "/return/:bookId",
  protect,
  returnBook
);

// Current user's borrowed books
router.get(
  "/borrowed",
  protect,
  getBorrowedBooks
);

// Admin - View all borrowed books
router.get(
  "/all",
  protect,
  authorize("admin"),
  getAllBorrows
);

module.exports = router;