const express = require("express");

const {
  getAllUsers,
  deleteUser,

  getAllBooks,
  deleteBookAdmin,

  getAllReviews,
  deleteReviewAdmin,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


// USERS

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.delete(
  "/user/:id",
  protect,
  authorize("admin"),
  deleteUser
);


// BOOKS

router.get(
  "/books",
  protect,
  authorize("admin"),
  getAllBooks
);

router.delete(
  "/book/:id",
  protect,
  authorize("admin"),
  deleteBookAdmin
);


// REVIEWS

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

module.exports = router;