var Book = require("../models/book");
const ErrObject = require("../ErrorData");
const { use } = require("../routers/bookRouter");

// get all books
const allBooks = (req, res) => {
  Book.find().then((books) => res.send(books));
};

// get book by id
const getBook = (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then((book) => {
      console.log(book);
      if (book == undefined)
        return next(ErrObject.notFoundError("Book Not Found"));
      res.send(book);
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
};


// add new book
const postBook = (req, res, next) => {
  let book = new Book({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    price: req.body.price,
    pagesCount: req.body.pagesCount,
    reviewCount: req.body.reviewCount,
    author: req.body.author,
  });

  book
    .save()
    .then(() => res.send(book))
    .catch((err) => next(ErrObject.notAcceptableError(err.message)));

};

//TODO
const putBook = (req, res) => {
  res.send("Not Implemented : putBook ");
};

//TODO
const deleteBook = (req, res) => {
  res.send("Not Implemented : deleteBook ");
};

module.exports = {
  allBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
};
