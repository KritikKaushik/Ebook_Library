const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

// Borrow Book
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const existingBorrow = await Borrow.findOne({
      user: req.user._id,
      book: req.params.bookId,
      status: "borrowed",
    });

    if (existingBorrow) {
      return res.status(400).json({
        message: "Book already borrowed",
      });
    }

    const borrow = await Borrow.create({
      user: req.user._id,
      book: req.params.bookId,
      status: "borrowed",
    });

    const populatedBorrow = await Borrow.findById(borrow._id)
      .populate("book")
      .populate("user", "name email");

    res.status(201).json(populatedBorrow);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Return Book
const returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findOne({
      user: req.user._id,
      book: req.params.bookId,
    });

    if (!borrow) {
      return res.status(404).json({
        message: "Borrow record not found",
      });
    }

    await borrow.deleteOne();

    res.json({
      message: "Book returned successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// User Borrowed Books
const getBorrowedBooks = async (req, res) => {
  try {
    // Clean orphaned borrow records
    const allBorrows = await Borrow.find({
      user: req.user._id,
      status: "borrowed",
    });

    for (const borrow of allBorrows) {
      const exists = await Book.exists({
        _id: borrow.book,
      });

      if (!exists) {
        await Borrow.findByIdAndDelete(borrow._id);
      }
    }

    // Return only valid borrowed books
    const borrows = await Borrow.find({
      user: req.user._id,
      status: "borrowed",
    })
      .populate({
        path: "book",
        populate: {
          path: "author",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - All Active Borrows
const getAllBorrows = async (req, res) => {
  try {
    // Clean orphaned borrow records
    const allBorrows = await Borrow.find({
      status: "borrowed",
    });

    for (const borrow of allBorrows) {
      const exists = await Book.exists({
        _id: borrow.book,
      });

      if (!exists) {
        await Borrow.findByIdAndDelete(borrow._id);
      }
    }

    // Return valid borrow records
    const borrows = await Borrow.find({
      status: "borrowed",
    })
      .populate("user", "name email")
      .populate("book", "title genre cover")
      .sort({ createdAt: -1 });

    res.json(borrows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getAllBorrows,
};