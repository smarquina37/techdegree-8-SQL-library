const express = require("express");
const book = require("../models/book");
const router = express.Router();
const Book = require("../models").Book;

// async Handler -  middleware to wrap each of our routes automatically in a try-catch block
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/* GET home page. */
// redirect '/' to '/books'
router.get("/", (req, res, next) => {
  // Redirect the "/" URL path to "/books"
  res.redirect("/books");
});

router.get(
  "/books",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("index", { books });
  })
);

/* Create a new book form. */
router.get("/books/new", (req, res) => {
  // "new-book" view will render in the browser
  res.render("new-book", { book: req.body });
});

/* POST create book. */
router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("new-book", {
          book,
          errors: error.errors,
          title: "New Book",
        });
      } else {
        throw error;
      }
    }
  })
);

/* GET individual book. */
router.get(
  "/books/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      // "update-book" view will render in the browser
      res.render("update-book", { book });
    } else {
      const error = new Error("Book not found in database");
      error.status = 404;
      next(error);
    }
  })
);

// /* Update a book. */
router.post(
  "/books/:id",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect("/");
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("update-book", {
          book,
          errors: error.errors,
          title: "Update Book",
        });
      } else {
        throw error;
      }
    }
  })
);

/* Delete book. */
router.post(
  "/books/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/");
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
