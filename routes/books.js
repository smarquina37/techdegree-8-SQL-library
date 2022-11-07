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
router.get("/new", (req, res) => {
  res.render("new-book");
});

/* POST create book. */
router.post(
  "/", // Is this correct url path?
  asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
  })
);

/* Edit book form. */
// router.get(
//   "/:id/edit",
//   asyncHandler(async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     res.render("update-book", { book: {}, title: "Edit Book" });
//   })
// );

/* GET individual book. */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render("update-book"); // Is this correct url path?
  })
);

/* Update a book. */
// router.post(
//   "/:id/edit",
//   asyncHandler(async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     await book.update(req.body);
//     res.redirect("/books/" + book.id);
//   })
// );

/* Delete book form. */
// router.post(
//   "/:id/delete",
//   asyncHandler(async (req, res) => {
//     res.redirect("/books");
//   })
// );
module.exports = router;
