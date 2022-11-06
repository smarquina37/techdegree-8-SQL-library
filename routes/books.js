const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

// async Handler -  middleware to wrap each of our routes automatically in a try-catch block
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

/* GET all books. */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("books/index", { books, title: "Books" });
  })
);

/* Create a new book form. */
router.get("/new", (req, res) => {
  res.render("books/new", { book: {}, title: "Create New Book" });
});

/* Create a new book form. */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    res.redirect("/books" + book.id);
  })
);
