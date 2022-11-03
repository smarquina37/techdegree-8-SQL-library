const express = require("express");
const router = express.Router();
const { Book } = require("../models/book.js");

/* GET home page. */
router.get("/books", async (req, res, next) => {
  // res.render("index", { title: "Express" });
  const books = await Book.findAll({});
  console.log(books);
});

module.exports = router;
