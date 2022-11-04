const express = require("express");
const router = express.Router();
const { Book } = require("../models/book.js");

// async Handler -  middleware to wrap each of our routes automatically in a try-catch block
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // res.render("error", { error: err });
      next(error);
    }
  };
}

/* GET home page. */
// redirect '/' to '/books'
router.get("/", (req, res) => {
  res.redirect("/books");
});

router.get(
  "/books",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("/book", { title: "Books", books: books.books });
    console.log(books);
  })
);

module.exports = router;
