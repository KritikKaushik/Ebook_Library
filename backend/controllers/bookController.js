const Book = require("../models/Book");

// Create Book
const createBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      genre: req.body.genre,
      content: req.body.content,
      featured: req.body.featured || false,
      cover: req.file
        ? `/uploads/covers/${req.file.filename}`
        : "",
      author: req.user._id,
    });

    const populatedBook = await Book.findById(book._id)
      .populate("author", "name email role");

    res.status(201).json(populatedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Featured Books
const getFeaturedBooks = async (req, res) => {
  try {
    const books = await Book.find({
      featured: true,
    }).populate("author", "name");

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Single Book
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author", "name email role");

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({
      author: req.user._id,
    })
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getBooks,
  getFeaturedBooks,
  getBookById,
  deleteBook,
  getMyBooks
};