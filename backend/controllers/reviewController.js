const Review = require("../models/Review");
const Book = require("../models/Book");

// Add Review
const addReview = async (req, res) => {
  try {
    const { bookId, review, rating } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const newReview = await Review.create({
      book: bookId,
      user: req.user._id,
      review,
      rating,
    });

    const populatedReview = await Review.findById(
      newReview._id
    )
      .populate("user", "name email")
      .populate("book", "title");

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reviews For Book
const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      book: req.params.bookId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Owner OR Admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await review.deleteOne();

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getBookReviews,
  deleteReview,
};