const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

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

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("index", { books });
  })
);

/* Create a new book form. */
router.get("/books/new", (req, res) => {
  res.render("new-book");
});

/* POST create article. */
// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const book = await Book.create(req.body);
//     res.redirect("/books");
//   })
// );

module.exports = router;
